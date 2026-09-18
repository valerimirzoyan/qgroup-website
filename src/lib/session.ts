import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const ADMIN_COOKIE = "qgroup_admin";

// No hardcoded fallback: the signing secret must come from the environment.
function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET is not configured.");
  }
  return new TextEncoder().encode(secret);
}

export const SESSION_DURATION_SECONDS = 60 * 60; // 1 hour

export interface SessionPayload {
  username: string;
  role: "admin";
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    if (payload.username && payload.role === "admin") {
      return { username: String(payload.username), role: "admin" };
    }
    return null;
  } catch {
    return null;
  }
}

export function sessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}