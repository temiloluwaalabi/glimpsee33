import { NextRequest, NextResponse } from "next/server";

import { allMockFeedItems } from "@/config/constants/mockdata";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const feedItem = allMockFeedItems.find((item) => item.id === id);

    if (!feedItem) {
      return NextResponse.json(
        { message: "Feed item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: feedItem,
      success: true,
      message: "Feed item fetched successfully",
    });
  } catch (error) {
    console.error("Feed item API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
