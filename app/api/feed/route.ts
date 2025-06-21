import { NextRequest, NextResponse } from "next/server";

import { allMockFeedItems } from "@/config/constants/mockdata";
import { FeedQuery } from "@/lib/api/api";
import { FeedItem, PaginatedResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query: FeedQuery = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      category: searchParams.get("category") || undefined,
      featured: searchParams.get("featured") === "true" || undefined,
      search: searchParams.get("search") || undefined,
      authorId: searchParams.get("authorId") || undefined,
    };

    let filteredItems = [...allMockFeedItems];
    // Apply filters
    if (query.category) {
      filteredItems = filteredItems.filter(
        (item) => item.category === query.category
      );
    }

    if (query.featured) {
      filteredItems = filteredItems.filter((item) => item.featured);
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (query.authorId) {
      filteredItems = filteredItems.filter(
        (item) => item.author.id === query.authorId
      );
    }

    // Sort by publishedAt (newest first)
    filteredItems.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const response: PaginatedResponse<FeedItem> = {
      data: {
        items: paginatedItems,
        pagination: {
          page,
          limit,
          total: filteredItems.length,
          totalPages: Math.ceil(filteredItems.length / limit),
          hasNext: endIndex < filteredItems.length,
          hasPrev: startIndex > 0,
        },
      },
      message: "Feed fetched successfully",
      success: true,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error("FEED API ERROR", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
