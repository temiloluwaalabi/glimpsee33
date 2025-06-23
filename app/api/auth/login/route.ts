import { NextRequest, NextResponse } from "next/server";

import { loginSession } from "@/app/actions/session.action";
import { findUserByEmail, validatePassword } from "@/app/actions/users.action";
import { User } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Validate password
    if (!validatePassword(password, user.password ?? "")) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await loginSession(user.email);

    // Return user data (without password)
    const userData: Partial<User> = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
    };

    return NextResponse.json({
      success: true,
      user: userData,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
