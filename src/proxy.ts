import { NextResponse, NextRequest } from "next/server";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const valid = token ? (await verifySessionToken(token)) !== null : false;

  // API routes: allow the login endpoint, otherwise require a valid session
  if (pathname.startsWith("/api/admin/")) {
    if (pathname === "/api/admin/login") {
      return NextResponse.next();
    }
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin pages
  // The login page is always accessible when unauthenticated; signed-in
  // users get bounced straight to the dashboard.
  if (pathname === "/admin/login") {
    if (valid) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Other admin pages require a valid session
  if (!valid) {
    const login = new URL("/admin/login", req.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export default proxy;