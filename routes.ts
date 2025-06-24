/**
 * An array of routes that are accesible to the public
 * These routes do no require authentication
 * @type {string[]}
 */

export const guestRoutes = [
  "/",
  "/forgot-password",
  "/login",
  "/reset-password",
  "/register",
  "/verify-email",
  "/error",
];

// export const sharedRoutes = ["/api/feed", "/api/categories"];
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to "/dashboard"
 * @type {string[]}
 */
export const authRoutes = [
  "/forgot-password",
  "/login",
  "/reset-password",
  "/register",
  "/verify-email",
];
/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export const apiFeedPrefix = "/api/feed";
export const apiCatPrefix = "/api/categories";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
export const LOGIN_LINK = "/login";
export const REGISTER_LINK = "/register";
// export const STUDIO_ROUTE = "/dashboard/studio";
// export const BECOME_AN_AUTHOR_ROUTE = "/dashboard/become-an-author";
// export const ONBOARDING_REDIRECT = "/onboarding";
