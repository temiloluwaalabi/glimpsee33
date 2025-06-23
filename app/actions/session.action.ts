"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { mockCurrentUser } from "@/config/constants/mockdata";
import { SessionData, sessionOptions } from "@/lib/auth/session";
import { sleep } from "@/lib/utils";

export async function getSession() {
  const shouldSleep = process.env.NODE_ENV === "development"; // Only sleep in development

  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (shouldSleep) {
    await sleep(250);
  }

  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  // Redirect to the homepage (or login page) immediately
  const headers = new Headers();
  headers.set("cache-control", "no-store");
  headers.set("location", "/"); // Correct location header setting

  return new Response(null, {
    status: 303,
    headers,
  });
}

export async function loginSession(email: string) {
  const user = mockCurrentUser;
  // const userInfo = await getUserInfo(accessToken);
  const session = await getSession();
  Object.assign(session, {
    userId: mockCurrentUser.id,
    firstName: user.name,
    email: email || user.email,
    isLoggedIn: true,
  });

  await session.save();

  revalidatePath("/");
}

export async function RegisterUserSession(user: {
  email: string;
  firstName: string;
}) {
  // const userInfo = await getUserInfo(accessToken);
  const session = await getSession();
  const current = mockCurrentUser;

  Object.assign(session, {
    userId: current.id,
    firstName: user.firstName,
    email: user.email,
    isLoggedIn: true,
  });

  await session.save();
  revalidatePath("/");
}
