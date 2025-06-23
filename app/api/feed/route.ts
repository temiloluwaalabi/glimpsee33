import { NextRequest, NextResponse } from "next/server";

import { allMockFeedItems, mockCategories } from "@/config/constants/mockdata";
import { FeedQuery } from "@/lib/api/api";
import { FeedItem, PaginatedResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query: Partial<FeedQuery> = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      category: searchParams.get("category") || "",
      featured: searchParams.get("featured") === "true" || false,
      search: searchParams.get("search") || "",
      authorId: searchParams.get("authorId") || "",
      sortBy: ((): "newest" | "oldest" | "popular" | "trending" => {
        const sort = searchParams.get("sort");
        if (
          sort === "newest" ||
          sort === "oldest" ||
          sort === "popular" ||
          sort === "trending"
        ) {
          return sort;
        }
        return "newest";
      })(),
    };

    let filteredItems = [...allMockFeedItems];
    // Apply filters
    if (query.category) {
      // Find the category by id from mockCategories
      const categoryObj = mockCategories.find(
        (cat) => cat.id === query.category
      );
      if (categoryObj) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.category.toLowerCase() === categoryObj.name.toLowerCase()
        );
      } else {
        // If category id not found, return empty
        filteredItems = [];
      }
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
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          item.author.name.toLowerCase().includes(searchLower)
      );
    }

    if (query.authorId) {
      filteredItems = filteredItems.filter(
        (item) => item.author.id === query.authorId
      );
    }

    // sort by date (newest first)
    filteredItems.sort((a, b) => {
      switch (query.sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "popular":
          return b.likes - a.likes;
        case "trending":
          return b.likes + b.comments - (a.likes + a.comments);
        default:
          return 0;
      }
    });

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    const response: PaginatedResponse<FeedItem> = {
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total: filteredItems.length,
        totalPages: Math.ceil(filteredItems.length / limit),
        hasNext: endIndex < filteredItems.length,
        hasPrev: startIndex > 0,
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
