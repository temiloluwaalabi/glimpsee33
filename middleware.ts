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

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname, origin, search } = nextUrl;

  try {
    const session = await getSession();
    const isLoggedIn = session?.isLoggedIn || false;

    console.log("SESSION", session);
    console.log("PATHNAME", pathname);
    console.log("IS_LOGGED_IN", isLoggedIn);

    // Check if it's an API auth route - skip middleware
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // Check if it's an auth route (login, register, etc.)
    const isAuthRoute = authRoutes.includes(pathname);

    // Check if it's a guest route (publicly accessible)
    const isGuestRoute = guestRoutes.includes(pathname);

    // Check if it's a shared route (accessible to both auth and unauth users)
    const isSharedRoute = sharedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // A route is considered private if it's not guest, not shared, and not auth
    const isPrivateRoute = !isGuestRoute && !isSharedRoute && !isAuthRoute;

    console.log("Route checks:", {
      isApiAuthRoute,
      isAuthRoute,
      isGuestRoute,
      isSharedRoute,
      isPrivateRoute,
    });

    // Handle authenticated users trying to access auth routes
    if (isAuthRoute && isLoggedIn) {
      console.log(
        "Redirecting logged-in user from auth route to:",
        DEFAULT_LOGIN_REDIRECT
      );
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, origin));
    }

    // Handle unauthenticated users trying to access private routes
    if (isPrivateRoute && !isLoggedIn) {
      console.log("Redirecting unauthenticated user to login");

      const sanitizedCallback = sanitizeCallbackUrl(
        `${pathname}${search}`,
        origin
      );
      const callbackUrl = sanitizedCallback || DEFAULT_LOGIN_REDIRECT;

      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("callbackUrl", callbackUrl);

      return NextResponse.redirect(loginUrl);
    }
    // Allow access to the requested route
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // If session retrieval fails, treat as unauthenticated
    // and redirect to login for private routes
    const isGuestRoute = guestRoutes.includes(pathname);
    const isSharedRoute = sharedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.includes(pathname);
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoute || isGuestRoute || isSharedRoute || isAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to login for private routes when session fails
    return NextResponse.redirect(new URL("/login", origin));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
