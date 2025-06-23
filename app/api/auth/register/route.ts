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

    return NextResponse.json({
      success: true,
      user: createdUser,
      message: "Registered successful",
    });
  } catch (error) {
    console.error("registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
