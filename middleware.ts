import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./app/actions/session.action";
import {
  apiAuthPrefix,
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

  // Add error handling for session retrieval
  let session;
  try {
    session = await getSession();
  } catch (error) {
    console.error("Failed to get session:", error);
    // If session retrieval fails, treat as not logged in
    session = { isLoggedIn: false };
  }

  const isLoggedIn = session?.isLoggedIn || false;

  const isAPiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  const isGuestRoute = guestRoutes.some((route) => pathname.endsWith(route));

  const privateRoute = !isGuestRoute;

  // Skip middleware for API auth routes
  if (isAPiAuthRoute) {
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
  matcher: ["/((?!.\\..|_next).)", "/", "/(api|trpc)(.)"],
};
