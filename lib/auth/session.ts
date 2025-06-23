import { SessionOptions } from "iron-session";
export interface SessionData {
  email: string;
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
}

export const defaultSession: SessionData = {
  email: "mockCurrentUser@gmail.com",
  firstName: "Mock User",
  userId: "g6d2e3f4-6i7j-9k8l-2m3n-7o8p9q0r1s2t",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "feed-explorer-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict",
  },
};
