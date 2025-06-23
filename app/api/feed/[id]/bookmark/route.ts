import { NextRequest, NextResponse } from "next/server";

import { mockFeedItems } from "@/config/constants/mockdata";

// Simulate delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(400);
  const id = (await params).id;

  const item = mockFeedItems.find((item) => String(item.id) === String(id));

  if (!item) {
    return NextResponse.json(
      { success: false, message: "Feed item not found" },
      { status: 404 }
    );
  }

  item.isBookmarked = !item.isBookmarked;

  return NextResponse.json({
    data: { isBookmarked: item.isBookmarked },
    status: true,
    message: "Feed saved successfully",
  });
}
