import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./app/actions/session.action";
import {
  apiAuthPrefix,
  apiCatPrefix,
  apiFeedPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  guestRoutes,
} from "./routes";

// Helper function to validate and sanitize callback URLs
const sanitizeCallbackUrl = (url: string, base: string) => {
  try {
    const parsed = new URL(url, base);
    // Only allow same-origin callback URLs
    return parsed.origin === base ? `${parsed.pathname}${parsed.search}` : "";
  } catch {
    return "";
  }
};

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin, search } = nextUrl;
  const session = await getSession();
  const isLoggedIn = session.isLoggedIn || false;
  console.log("SESSION", session);
  console.log("PATHNAME", pathname);
  // Helper function to check if a path starts with any guest or shared route
  const isAccessibleRoute = (pathname: string, routes: string[]) => {
    return routes.some((route) => pathname.endsWith(route));
  };

  const isAPiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAPiFeedRoute = pathname.startsWith(apiFeedPrefix);
  const isAPiCatRoute = pathname.startsWith(apiCatPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isGuestRoute = isAccessibleRoute(pathname, guestRoutes);
  const privateRoute = !isGuestRoute;

  // Skip middleware for API auth routes
  if (isAPiAuthRoute || isAPiCatRoute || isAPiFeedRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users from private routes to login
  if (privateRoute && !isLoggedIn) {
    const sanitizedCallback = sanitizeCallbackUrl(
      `${pathname}${search}`,
      origin
    );
    const callbackUrl = sanitizedCallback || DEFAULT_LOGIN_REDIRECT;

    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from accessing auth pages (login/signup)
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
