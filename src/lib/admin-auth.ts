import bcrypt from "bcryptjs";

// Admin credentials come from the environment only — no committed secrets.
// ADMIN_USERNAME is not sensitive; ADMIN_PASSWORD_HASH (bcrypt) is required.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "qadmin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

export function getAdminUsername(): string {
  return ADMIN_USERNAME;
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (!username || !password || !ADMIN_PASSWORD_HASH) return false;
  const userOk = username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase();
  if (!userOk) {
    // Constant-time-ish dummy compare to reduce timing side-channel differences
    await bcrypt.compare("invalid-password-placeholder", ADMIN_PASSWORD_HASH);
    return false;
  }
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}
