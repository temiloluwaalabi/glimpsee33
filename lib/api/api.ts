"use server";

import { Category, FeedItem } from "@/types";

import { ApiError } from "./api-client";
import { makeApiRequest } from "./api-request-setup";

export interface FeedQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  authorId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  success: boolean;
}

export const feedService = {
  getFeedItems: async (query: FeedQuery = {}) => {
    const result = await makeApiRequest<{
      data: FeedItem[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
      success: boolean;
    }>("/feed", "GET", {
      params: {
        ...query,
      },
    });

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },

  getFeedItem: async (id: string) => {
    const result = await makeApiRequest<FeedItem>(`/feed/${id}`, "GET");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },

  likeFeedItem: async (id: string) => {
    const result = await makeApiRequest<{
      isLiked: boolean;
      likes: number;
    }>(`/feed/${id}/like`, "POST");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },

  bookmarkFeedItem: async (id: string) => {
    const result = await makeApiRequest<{
      isBookmarked: boolean;
    }>(`/feed/${id}/bookmark`, "POST");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
};

export const categoryService = {
  getCategories: async () => {
    const result = await makeApiRequest<Category[]>("/categories", "GET", {});

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
};
