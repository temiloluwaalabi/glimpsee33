import { NextRequest, NextResponse } from "next/server";

import { allMockFeedItems } from "@/config/constants/mockdata";

// Mock data import or definition

// POST /api/auth/me/bookmarks
export async function POST(req: NextRequest) {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Parse body for pagination (optional, fallback to defaults)
  const { page = 1, limit = 10 } = await req.json().catch(() => ({}));

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;

  // Filter bookmarked items
  const savedItems = allMockFeedItems.filter((item) => item.isBookmarked);

  // Pagination logic
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedItems = savedItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(savedItems.length / limitNum);

  return NextResponse.json({
    data: paginatedItems,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: savedItems.length,
      totalPages,
      hasMore: pageNum < totalPages,
    },
    status: true,
    message: "Bookmarked feeds fetched successfully",
  });
}
