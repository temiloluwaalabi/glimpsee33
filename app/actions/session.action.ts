"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { mockCurrentUser } from "@/config/constants/mockdata";
import {
  defaultSession,
  SessionData,
  sessionOptions,
} from "@/lib/auth/session";
import { sleep } from "@/lib/utils";

export async function getSession(): Promise<SessionData> {
  const shouldSleep = process.env.NODE_ENV === "development";

  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    if (shouldSleep) {
      await sleep(250);
    }

    // Return session with defaults if empty
    return {
      email: session.email || defaultSession.email,
      firstName: session.firstName || defaultSession.firstName,
      userId: session.userId || defaultSession.userId,
      isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
    };
  } catch (error) {
    console.error("Session retrieval error:", error);
    return defaultSession;
  }
}

export async function logout() {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    session.destroy();

    // Force revalidation
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Logout failed" };
  }
}

export async function loginSession(email: string) {
  try {
    const user = mockCurrentUser;
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    // Set session properties directly (matching the interface)
    session.userId = user.id;
    session.firstName = user.name;
    session.email = email || user.email;
    session.isLoggedIn = true;

    await session.save();

    // Force revalidation of the entire layout
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Login session error:", error);
    return { success: false, error: "Login failed" };
  }
}

export async function RegisterUserSession(user: {
  email: string;
  firstName: string;
}) {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    const current = mockCurrentUser;

    session.userId = current.id;
    session.firstName = user.firstName;
    session.email = user.email;
    session.isLoggedIn = true;

    await session.save();

    // Force revalidation of the entire layout
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Register session error:", error);
    return { success: false, error: "Registration failed" };
  }
}
