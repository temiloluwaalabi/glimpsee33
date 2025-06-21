import { delay, http, HttpResponse } from "msw";

import {
  allMockFeedItems,
  mockCategories,
  mockCurrentUser,
} from "@/config/constants/mockdata";

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/feed`, async ({ request }) => {
    // simulate network delay
    await delay(800);

    console.log("Mocker is used");
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort") || "newest";

    let filteredItems = [...allMockFeedItems];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          item.author.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.category === category
      );
    }

    // sort by date (newest first)
    filteredItems.sort((a, b) => {
      switch (sort) {
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
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/feed/:id`,
    async ({ params }) => {
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

      const itemWithViews = {
        ...item,
        views: Math.floor(Math.random() * 1000) + 100,
      };
      return HttpResponse.json({
        data: itemWithViews,
        status: true,
        message: "All feeds        fetched successfully",
      });
    }
  ),
  // GET RELATED FEED ITEMS
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/feed/:id/related`,
    async ({ params }) => {
      await delay(600);
      const { id } = params;
      const currentItem = allMockFeedItems.find(
        (item) => String(item.id) === String(id)
      );
      if (!currentItem) {
        return HttpResponse.json(
          { success: false, message: "Feed item not found" },
          { status: 404 }
        );
      }

      const relatedItems = allMockFeedItems
        .filter((item) => item.id !== id)
        .filter(
          (item) =>
            item.category === currentItem?.category ||
            item.tags.some((tag) => currentItem?.tags.includes(tag))
        )
        .slice(0, 4);

      return HttpResponse.json({
        data: relatedItems,
        status: true,
        message: "All feeds fetched successfully",
      });
    }
  ),
  // GET CATEGORIES
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, async () => {
    await delay(300);

    return HttpResponse.json({
      data: mockCategories,
      status: true,
      message: "All feeds fetched successfully",
    });
  }),

  // simulate like action
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/feed/:id/like`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/feed/:id/bookmark`,
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
  // GET USER PROFILE
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, async () => {
    await delay(600);

    return HttpResponse.json({
      data: mockCurrentUser,
      status: true,
      message: "User fetched successfully",
    });
  }),

  // GET USER"S SAVED ITEMS
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/saved`,
    async ({ request }) => {
      await delay(600);

      const url = new URL(request.url);

      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(url.searchParams.get("limit") || "10");

      const savedItems = allMockFeedItems.filter((item) => item.isBookmarked);

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = savedItems.slice(startIndex, endIndex);

      const totalPages = Math.ceil(savedItems.length / limit);

      return HttpResponse.json({
        data: paginatedItems,
        pagination: {
          page,
          limit,
          total: savedItems.length,
          totalPages,
          hasMore: page < totalPages,
        },
        status: true,
        message: "Bookmarked feeds fetched successfully",
      });
    }
  ),

  // SEARCH SUGGESSTION
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/search/suggesstion`,
    async ({ request }) => {
      await delay(500);

      const url = new URL(request.url);
      const query = url.searchParams.get("q") || "";

      if (query.length < 2) {
        return HttpResponse.json({ data: [] });
      }

      const suggesstion = new Set<string>();

      allMockFeedItems.forEach((item) => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          suggesstion.add(item.title);
        }

        if (item.author.name.toLowerCase().includes(query.toLowerCase())) {
          suggesstion.add(item.author.name);
        }

        item.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(query.toLowerCase())) {
            suggesstion.add(tag);
          }
        });
      });

      const suggesstionArray = Array.from(suggesstion).slice(0, 8);

      return HttpResponse.json({
        data: suggesstionArray,
        status: true,
        message: "All suggesstions successfully",
      });
    }
  ),
];
