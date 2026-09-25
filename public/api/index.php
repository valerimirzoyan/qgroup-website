<?php

declare(strict_types=1);

const SESSION_TTL = 3600;
const MAX_BODY_BYTES = 1048576;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$configPath = __DIR__ . '/config.php';
$config = is_file($configPath) ? require $configPath : [];
if (!is_array($config)) {
    $config = [];
}

$adminUsername = trim((string)($config['username'] ?? ''));
$adminPasswordHash = trim((string)($config['password_hash'] ?? ''));
$isHttps = (!empty($_SERVER['HTTPS']) && strtolower((string)$_SERVER['HTTPS']) !== 'off')
    || strtolower((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';

ini_set('session.use_strict_mode', '1');
session_name('qgroup_admin');
session_set_cookie_params([
    'lifetime' => SESSION_TTL,
    'path' => '/',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function respond(mixed $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function requestPath(): string
{
    $path = parse_url((string)($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
    if (!is_string($path) || $path === '') {
        return '/';
    }
    $script = str_replace('\\', '/', (string)($_SERVER['SCRIPT_NAME'] ?? ''));
    $base = rtrim(dirname(dirname($script)), '/');
    if ($base !== '' && $base !== '/' && str_starts_with($path, $base . '/')) {
        $path = substr($path, strlen($base));
    }
    $path = rawurldecode($path);
    $path = preg_replace('#/+#', '/', $path) ?? '/';
    if ($path === '' || $path[0] !== '/') {
        $path = '/' . ltrim($path, '/');
    }
    return rtrim($path, '/') ?: '/';
}

function requestMethod(): string
{
    return strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET'));
}

function requestJson(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
        respond(['error' => 'Invalid request body.'], 400);
    }
    $data = json_decode($raw === '' ? '{}' : $raw, true);
    if (!is_array($data)) {
        respond(['error' => 'Invalid request body.'], 400);
    }
    return $data;
}

function authenticated(): bool
{
    if (!isset($_SESSION['admin_username']) || !is_string($_SESSION['admin_username']) || $_SESSION['admin_username'] === '') {
        return false;
    }
    return (int)($_SESSION['login_expires_at'] ?? 0) > time();
}

function refreshSession(): void
{
    $_SESSION['login_expires_at'] = time() + SESSION_TTL;
    $params = session_get_cookie_params();
    setcookie(session_name(), session_id(), [
        'expires' => time() + SESSION_TTL,
        'path' => $params['path'] ?: '/',
        'domain' => $params['domain'],
        'secure' => $params['secure'],
        'httponly' => true,
        'samesite' => $params['samesite'] ?? 'Lax',
    ]);
}

function requireAdmin(): void
{
    if (!authenticated()) {
        respond(['error' => 'Unauthorized'], 401);
    }
    refreshSession();
}

function sameOriginRequest(): bool
{
    $origin = trim((string)($_SERVER['HTTP_ORIGIN'] ?? ''));
    if ($origin === '') {
        return true;
    }
    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = (string)($_SERVER['HTTP_HOST'] ?? '');
    $requestHost = strtolower(preg_replace('/:\\d+$/', '', $requestHost) ?? $requestHost);
    return is_string($originHost) && strtolower($originHost) === $requestHost;
}

function requireSameOrigin(): void
{
    if (!sameOriginRequest()) {
        respond(['error' => 'Invalid request origin.'], 403);
    }
}

function clientIp(): string
{
    $forwarded = trim((string)($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ''));
    if ($forwarded !== '') {
        $first = trim(explode(',', $forwarded)[0]);
        if ($first !== '') {
            return $first;
        }
    }
    return (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function loginRateLimited(string $ip): bool
{
    $now = time();
    $entry = $_SESSION['login_attempts'] ?? null;
    if (!is_array($entry) || !isset($entry['count'], $entry['reset_at']) || (int)$entry['reset_at'] <= $now) {
        $_SESSION['login_attempts'] = ['count' => 1, 'reset_at' => $now + 900];
        return false;
    }
    if ((int)$entry['count'] >= 5) {
        return true;
    }
    $_SESSION['login_attempts'] = [
        'count' => (int)$entry['count'] + 1,
        'reset_at' => (int)$entry['reset_at'],
    ];
    return false;
}

function collectionPath(string $name): string
{
    return __DIR__ . '/data/' . $name . '.json';
}

function readCollection(string $name): array
{
    $path = collectionPath($name);
    if (!is_file($path)) {
        return [];
    }
    $raw = file_get_contents($path);
    if ($raw === false) {
        return [];
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return [];
    }
    return array_values(array_filter($data, 'is_array'));
}

function writeCollection(string $name, array $records): void
{
    $directory = __DIR__ . '/data';
    if (!is_dir($directory) && !mkdir($directory, 0770, true) && !is_dir($directory)) {
        throw new RuntimeException('Unable to create data directory.');
    }
    $path = collectionPath($name);
    $temporary = tempnam($directory, '.qgroup-');
    if ($temporary === false) {
        throw new RuntimeException('Unable to create a temporary data file.');
    }
    $encoded = json_encode(array_values($records), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($encoded === false || file_put_contents($temporary, $encoded . PHP_EOL, LOCK_EX) === false) {
        @unlink($temporary);
        throw new RuntimeException('Unable to write data file.');
    }
    @chmod($temporary, 0660);
    if (!rename($temporary, $path)) {
        @unlink($temporary);
        throw new RuntimeException('Unable to replace data file.');
    }
    @chmod($path, 0660);
}

function textValue(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = trim($value);
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength);
    }
    return substr($value, 0, $maxLength);
}

function optionalText(mixed $value, int $maxLength): ?string
{
    $value = textValue($value, $maxLength);
    return $value === '' ? null : $value;
}

function newId(): string
{
    return bin2hex(random_bytes(16));
}

function validId(string $id): bool
{
    return preg_match('/^[a-f0-9]{32}$/i', $id) === 1;
}

function handleLogin(string $adminUsername, string $adminPasswordHash): never
{
    if (requestMethod() !== 'POST') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    requireSameOrigin();
    $body = requestJson();
    $username = textValue($body['username'] ?? '', 120);
    $password = is_string($body['password'] ?? null) ? (string)$body['password'] : '';
    if ($username === '' || $password === '') {
        respond(['error' => 'Username and password are required.'], 400);
    }
    if (loginRateLimited(clientIp())) {
        respond(['error' => 'Too many login attempts. Please try again in 15 minutes.'], 429);
    }
    $valid = $adminUsername !== '' && $adminPasswordHash !== ''
        && hash_equals(strtolower($adminUsername), strtolower($username))
        && password_verify($password, $adminPasswordHash);
    if (!$valid) {
        usleep(250000);
        respond(['error' => 'Invalid username or password.'], 401);
    }
    session_regenerate_id(true);
    $_SESSION = [];
    $_SESSION['admin_username'] = $adminUsername;
    $_SESSION['login_expires_at'] = time() + SESSION_TTL;
    respond(['success' => true]);
}

function handleLogout(): never
{
    if (requestMethod() !== 'POST') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    requireSameOrigin();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $params['path'],
            'domain' => $params['domain'],
            'secure' => $params['secure'],
            'httponly' => $params['httponly'],
            'samesite' => $params['samesite'] ?? 'Lax',
        ]);
    }
    session_destroy();
    respond(['success' => true]);
}

function handleMe(): never
{
    if (requestMethod() !== 'GET') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    if (!authenticated()) {
        respond(['authenticated' => false], 401);
    }
    refreshSession();
    respond(['authenticated' => true, 'username' => $_SESSION['admin_username']]);
}

function handleContent(string $name): never
{
    if (requestMethod() !== 'GET') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    respond(readCollection($name));
}

function handleCollection(string $name): never
{
    requireAdmin();
    if (requestMethod() === 'GET') {
        respond(readCollection($name));
    }
    if (requestMethod() !== 'POST') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    requireSameOrigin();
    $body = requestJson();
    $records = readCollection($name);
    if ($name === 'clients') {
        $itemName = textValue($body['name'] ?? '', 200);
        $colorSrc = textValue($body['colorSrc'] ?? '', 2048);
        if ($itemName === '' || $colorSrc === '') {
            respond(['error' => 'Name and colored logo are required.'], 400);
        }
        $record = [
            'id' => newId(),
            'name' => $itemName,
            'category' => textValue($body['category'] ?? '', 120),
            'colorSrc' => $colorSrc,
            'monoSrc' => optionalText($body['monoSrc'] ?? null, 2048),
            'alt' => optionalText($body['alt'] ?? null, 300) ?? $itemName,
            'url' => optionalText($body['url'] ?? null, 2048),
        ];
    } else {
        $itemName = textValue($body['name'] ?? '', 200);
        $logo = textValue($body['logo'] ?? '', 2048);
        if ($itemName === '' || $logo === '') {
            respond(['error' => 'Name and logo are required.'], 400);
        }
        $record = [
            'id' => newId(),
            'name' => $itemName,
            'logo' => $logo,
            'tag' => textValue($body['tag'] ?? '', 200),
            'type' => textValue($body['type'] ?? '', 120),
            'url' => optionalText($body['url'] ?? null, 2048),
        ];
    }
    $records[] = $record;
    try {
        writeCollection($name, $records);
    } catch (Throwable) {
        respond(['error' => 'Unable to save changes on the server.'], 500);
    }
    respond($record, 201);
}

function handleDelete(string $name, string $id): never
{
    requireAdmin();
    if (requestMethod() !== 'DELETE') {
        respond(['error' => 'Method not allowed.'], 405);
    }
    requireSameOrigin();
    if (!validId($id)) {
        respond(['error' => 'Record not found.'], 404);
    }
    $records = readCollection($name);
    $next = [];
    $deleted = false;
    foreach ($records as $record) {
        if (!$deleted && (string)($record['id'] ?? '') === $id) {
            $deleted = true;
            continue;
        }
        $next[] = $record;
    }
    if (!$deleted) {
        respond(['error' => ucfirst($name === 'clients' ? 'client' : 'partner') . ' not found.'], 404);
    }
    try {
        writeCollection($name, $next);
    } catch (Throwable) {
        respond(['error' => 'Unable to save changes on the server.'], 500);
    }
    respond(['success' => true]);
}

$path = requestPath();
$method = requestMethod();

if ($path === '/api/admin/login') {
    handleLogin($adminUsername, $adminPasswordHash);
}
if ($path === '/api/admin/logout') {
    handleLogout();
}
if ($path === '/api/admin/me') {
    handleMe();
}
if ($path === '/api/content/clients') {
    handleContent('clients');
}
if ($path === '/api/content/partners') {
    handleContent('partners');
}
if ($path === '/api/admin/clients') {
    handleCollection('clients');
}
if ($path === '/api/admin/partners') {
    handleCollection('partners');
}
if (preg_match('#^/api/admin/clients/([^/]+)$#', $path, $matches) === 1) {
    handleDelete('clients', $matches[1]);
}
if (preg_match('#^/api/admin/partners/([^/]+)$#', $path, $matches) === 1) {
    handleDelete('partners', $matches[1]);
}

respond(['error' => 'Not found.'], 404);
