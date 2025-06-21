import { NextResponse } from "next/server";

import { mockCurrentUser } from "@/config/constants/mockdata";

export async function GET() {
  try {
    return NextResponse.json({
      data: mockCurrentUser,
      message: "User fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
