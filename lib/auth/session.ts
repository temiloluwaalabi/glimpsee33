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
  cookieName: "feed-explorer-session",
  password: process.env.SECRET_KEY as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  },
};
declare module "iron-session" {
  interface IronSessionData {
    user?: SessionData;
  }
}
