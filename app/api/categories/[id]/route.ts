import { NextRequest, NextResponse } from "next/server";

import { mockCategories } from "@/config/constants/mockdata";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const category = mockCategories.find((item) => item.id === id);

    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: category,
      success: true,
      message: "Category fetched successfully",
    });
  } catch (error) {
    console.error("Category API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
