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

  // Toggle like status
  item.isLiked = !item.isLiked;
  item.likes += item.isLiked ? 1 : -1;

  return NextResponse.json({
    data: { isLiked: item.isLiked, likes: item.likes },
    status: true,
    message: "Feed liked successfully",
  });
}
