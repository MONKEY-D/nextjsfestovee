// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// import { WEBSITE_LOGIN } from "./routes/WebsiteRoute";
// import { USER_DASHBOARD } from "./routes/WebsiteRoute";

// export async function middleware(request) {
//   try {
//     const pathname = request.nextUrl.pathname;

//     if (pathname.startsWith("/api")) {
//       return NextResponse.next();
//     }

//     const hasToken = request.cookies.has("access_token");

//     // If no token
//     if (!hasToken) {
//       // Allow auth routes without token
//       if (pathname.startsWith("/auth")) {
//         return NextResponse.next();
//       }

//       // Redirect any protected route to login
//       return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
//     }

//     // Verify token
//     const access_token = request.cookies.get("access_token").value;
//     await jwtVerify(
//       access_token,
//       new TextEncoder().encode(process.env.SECRET_KEY)
//     );

//     // If user is logged in, prevent accessing /auth/*
//     if (pathname.startsWith("/auth")) {
//       return NextResponse.redirect(new URL(USER_DASHBOARD, request.nextUrl));
//     }

//     // Protect both admin & user dashboards
//     if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
//       return NextResponse.next();
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("[middleware] Auth error:", error);
//     return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

import { WEBSITE_LOGIN, USER_DASHBOARD } from "./routes/WebsiteRoute";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes (always accessible)
  if (
    pathname.startsWith("/_next") || // Next internals
    pathname.startsWith("/static") || // Static files
    pathname.startsWith("/api") || // APIs handled separately
    pathname === "/" || // homepage
    pathname.startsWith("/shop") // shop/product pages
  ) {
    return NextResponse.next();
  }

  const hasToken = request.cookies.has("access_token");

  // Unauthenticated users
  if (!hasToken) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.next(); // allow login/register/reset
    }
    if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    }
    return NextResponse.next(); // everything else is public
  }

  // Verify token
  try {
    const access_token = request.cookies.get("access_token").value;
    await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.SECRET_KEY)
    );

    // Prevent logged-in users from accessing /auth/*
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("[middleware] invalid token", err);
    // clear cookie + redirect
    const res = NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    res.cookies.delete("access_token");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
