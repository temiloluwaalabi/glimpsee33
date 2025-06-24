import { NextRequest, NextResponse } from "next/server";

import { loginSession } from "@/app/actions/session.action";
import { mockCurrentUser } from "@/config/constants/mockdata";
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
    const user = mockCurrentUser;
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Validate password
    if (user.password !== password) {
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
    // Create response with proper headers to prevent caching
    const response = NextResponse.json({
      success: true,
      user: userData,
      message: "Login successful",
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
