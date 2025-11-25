import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const token = req.cookies.get("verifyToken")?.value || "";
  const decoded = verifyToken(token);

  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!decoded && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (decoded && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
