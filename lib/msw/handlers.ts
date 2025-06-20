import { delay, http, HttpResponse } from "msw";

import { allMockFeedItems, mockCategories } from "@/config/constants/mockdata";

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API}/feed`, async ({ request }) => {
    // simulate network delay
    await delay(800);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    let filteredItems = [...allMockFeedItems];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (category && category !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.category === category
      );
    }

    // sort by date (newest first)
    filteredItems.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total: filteredItems.length,
        totalPages: Math.ceil(filteredItems.length / limit),
        hasMore: endIndex < filteredItems.length,
      },
      status: true,
      message: "All feeds fetched successfully",
    });
  }),

  http.get(`${process.env.NEXT_PUBLIC_API}/feed/:id`, async ({ params }) => {
    await delay(500);
    const { id } = params;
    const item = allMockFeedItems.find(
      (item) => String(item.id) === String(id)
    );
    if (!item) {
      return HttpResponse.json(
        { success: false, message: "Feed item not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      data: item,
      status: true,
      message: "All feeds fetched successfully",
    });
  }),

  // GET CATEGORIES
  http.get(`${process.env.NEXT_PUBLIC_API}/categories`, async () => {
    await delay(300);

    return HttpResponse.json({
      data: mockCategories,
      status: true,
      message: "All feeds fetched successfully",
    });
  }),

  // simulate like action
  http.get(
    `${process.env.NEXT_PUBLIC_API}/feed/:id/like`,
    async ({ params }) => {
      await delay(400);
      const { id } = params;
      const item = allMockFeedItems.find(
        (item) => String(item.id) === String(id)
      );
      if (!item) {
        return HttpResponse.json(
          { success: false, message: "Feed item not found" },
          { status: 404 }
        );
      }

      // TOggle like status

      item.isLiked = !item.isLiked;
      item.likes += item.isLiked ? 1 : -1;
      return HttpResponse.json({
        data: { isLiked: item.isLiked, likes: item.likes },
        status: true,
        message: "All feeds fetched successfully",
      });
    }
  ),
  // simulate bookmark action
  http.get(
    `${process.env.NEXT_PUBLIC_API}/feed/:id/bookmark`,
    async ({ params }) => {
      await delay(400);
      const { id } = params;
      const item = allMockFeedItems.find(
        (item) => String(item.id) === String(id)
      );
      if (!item) {
        return HttpResponse.json(
          { success: false, message: "Feed item not found" },
          { status: 404 }
        );
      }

      // TOggle like status

      item.isBookmarked = !item.isBookmarked;
      return HttpResponse.json({
        data: { isBookmarked: item.isBookmarked },
        status: true,
        message: "All feeds fetched successfully",
      });
    }
  ),
];
