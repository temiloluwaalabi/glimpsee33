import { SessionOptions } from "iron-session";
export interface SessionData {
  email: string;
  isLoggedIn: boolean;
  userId: string;
  firstName: string;
}

export const defaultSession: SessionData = {
  email: "",
  firstName: "",
  userId: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  cookieName: "feed-explorer-session",
  password: process.env.SECRET_KEY as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  },
};
declare module "iron-session" {
  interface IronSessionData {
    email?: string;
    isLoggedIn?: boolean;
    userId?: string;
    firstName?: string;
  }
}
