import { NextRequest, NextResponse } from "next/server";

import { mockAuthors } from "@/config/constants/mockdata";
import { UserQuery } from "@/lib/api/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query: Partial<UserQuery> = {
      search: searchParams.get("search") || "",
      role: ((): "user" | "admin" | "moderator" | undefined => {
        const roleParam = searchParams.get("role");
        if (
          roleParam === "user" ||
          roleParam === "admin" ||
          roleParam === "moderator"
        ) {
          return roleParam;
        }
        return "user";
      })(),
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "4"),
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
    let filteredUsers = [...mockAuthors];

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.bio?.toLowerCase().includes(searchLower)
      );

      if (query.role) {
        filteredUsers = filteredUsers.filter(
          (item) => item.role === query.role
        );
      }

      // sort by date (newest first)
      filteredUsers.sort((a, b) => {
        switch (query.sortBy) {
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

          default:
            return 0;
        }
      });
    }

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredUsers.slice(startIndex, endIndex);

    const response = {
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
        hasNext: endIndex < filteredUsers.length,
        hasPrev: startIndex > 0,
      },
      message: "USERS fetched successfully",
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("USERS API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
