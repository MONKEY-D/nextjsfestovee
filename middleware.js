import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { USER_DASHBOARD } from "./routes/WebsiteRoute";

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    const hasToken = request.cookies.has("access_token");

    // If no token
    if (!hasToken) {
      // Allow auth routes without token
      if (pathname.startsWith("/auth")) {
        return NextResponse.next();
      }

      // Redirect any protected route to login
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
    }

    // Verify token
    const access_token = request.cookies.get("access_token").value;
    await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    // If user is logged in, prevent accessing /auth/*
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL(USER_DASHBOARD, request.nextUrl));
    }

    // Protect both admin & user dashboards
    if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[middleware] Auth error:", error);
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
