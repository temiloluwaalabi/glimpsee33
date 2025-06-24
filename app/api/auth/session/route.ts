import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { mockCurrentUser } from "@/config/constants/mockdata";
import {
  defaultSession,
  SessionData,
  sessionOptions,
} from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  const current = mockCurrentUser;

  // Parse user data from request body
  const user: { email: string; firstName: string } = await request.json();

  console.log("SESSION ROUTE USER", user);
  session.isLoggedIn = true;
  session.firstName = user.firstName ?? "";
  session.email = user.email ?? "";
  session.userId = current.id;

  await session.save();

  // await sleep(250);

  const response = NextResponse.redirect(new URL("/", request.url), 303);

  // Prevent caching of the redirect
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");

  return response;
}

export async function GET(request: NextRequest) {
  console.log("SESSION GET CALLED");
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const action = new URL(request.url).searchParams.get("action");

  if (action === "logout") {
    session.destroy();
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    return response;
  }
  // await sleep(250);

  if (session.isLoggedIn !== true) {
    return NextResponse.json(defaultSession, { status: 401 });
  }

  // Create response with proper cache headers
  const responseData = session.isLoggedIn
    ? {
        userId: session.userId,
        email: session.email,
        firstName: session.firstName,
        isLoggedIn: session.isLoggedIn,
      }
    : defaultSession;
  const response = NextResponse.json(responseData, {
    status: session.isLoggedIn ? 200 : 401,
  });

  // Prevent caching of session data
  response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export async function PATCH() {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    // Update to a fixed expiration time (e.g., 1 hour)
    const fixedMaxAge = 3600; // 1 hour in seconds

    session.updateConfig({
      ...sessionOptions,
      cookieOptions: {
        ...sessionOptions.cookieOptions,
        maxAge: fixedMaxAge,
      },
    });

    await session.save();

    return NextResponse.json({ message: "Session updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update session", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.destroy();

  revalidatePath("/");

  return NextResponse.json(defaultSession);
}
