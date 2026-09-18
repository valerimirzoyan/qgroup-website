import { cookies } from "next/headers";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/session";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return (await verifySessionToken(token)) !== null;
}