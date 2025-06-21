import { NextResponse } from "next/server";

import { mockCategories } from "@/config/constants/mockdata";

export async function GET() {
  try {
    return NextResponse.json({
      data: mockCategories,
      message: "Categories fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
