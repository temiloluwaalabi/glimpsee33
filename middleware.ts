import { NextRequest, NextResponse } from "next/server";

import { getSession } from "./app/actions/session.action";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  guestRoutes,
  sharedRoutes,
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
// Fallback function to check for basic auth cookie presence
function hasAuthCookie(req: NextRequest): boolean {
  const authCookie = req.cookies.get("feed-explorer-session");
  return !!authCookie?.value;
}
export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin, search } = nextUrl;

  // Enhanced logging for debugging
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
  const hasBasicAuthCookie = hasAuthCookie(req);

  console.log("🔍 Middleware Debug:", {
    pathname,
    isMobile,
    hasAuthCookie: hasBasicAuthCookie,
    cookieValue:
      req.cookies.get("feed-explorer-session")?.value?.substring(0, 20) + "...",
  });

  // Get session with better error handling
  let session;
  let isLoggedIn = false;

  try {
    session = await getSession();
    isLoggedIn = session?.isLoggedIn || false;

    // Fallback: if session call fails but we have a cookie, assume logged in
    if (!isLoggedIn && hasBasicAuthCookie) {
      console.log(
        "⚠️ Session call failed but auth cookie exists - assuming logged in"
      );
      isLoggedIn = true;
    }
  } catch (error) {
    console.error("Session retrieval failed:", error);
    // Fallback to cookie presence check
    isLoggedIn = hasBasicAuthCookie;
    console.log("🔄 Using cookie fallback, isLoggedIn:", isLoggedIn);
  }

  console.log("📱 Session Status:", {
    isLoggedIn,
    userId: session?.userId,
    email: session?.email,
    pathname,
    isMobile,
    hasBasicAuthCookie,
  });

  // Helper function to check if a path starts with any guest or shared route
  const isAccessibleRoute = (pathname: string, routes: string[]) => {
    return routes.some((route) => pathname.startsWith(route));
  };

  const isAPiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isGuestRoute = guestRoutes.some(
    (route) => pathname === route || pathname.endsWith(route)
  );
  const isSharedRoutes = isAccessibleRoute(pathname, sharedRoutes);
  const privateRoute = !isGuestRoute && !isSharedRoutes;

  console.log("🚦 Route Analysis:", {
    pathname,
    isAPiAuthRoute,
    isAuthRoute,
    isGuestRoute,
    isSharedRoutes,
    privateRoute,
    isLoggedIn,
  });

  // Skip middleware for API auth routes
  if (isAPiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users from private routes to login
  if (privateRoute && !isLoggedIn) {
    console.log("🔒 Redirecting to login - private route, not logged in");

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
    console.log("🔄 Redirecting logged-in user away from auth route");
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
  }

  // Continue to the requested page
  console.log("✅ Allowing access to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
