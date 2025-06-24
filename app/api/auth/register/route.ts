import { NextRequest, NextResponse } from "next/server";

import { RegisterUserSession } from "@/app/actions/session.action";
import { mockCurrentUser } from "@/config/constants/mockdata";
import { User } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await request.json();

    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const createdUser: Partial<User> = {
      id: mockCurrentUser.id,
      email,
      name: firstname,
      password,
    };

    await RegisterUserSession({ email, firstName: firstname });
    const response = NextResponse.json({
      success: true,
      user: createdUser,
      message: "Registered successful",
    });

    response.headers.set("X-Redirect", "/");

    // Add cache control headers
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
