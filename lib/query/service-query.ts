import { Category, FeedItem } from "@/types";
import { apiClient } from "../api/api-client";
import { makeApiRequest } from "../api/api";

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
    return makeApiRequest<FeedItem[]>("/feed", "GET", {
      params: {
        ...query,
      },
    });
  },

  getFeedItem: async (id: string): Promise<FeedItem> => {
    const response = await apiClient.get(`/feed/${id}`);
    return response.data.data;
  },

  likeFeedItem: async (id: string) => {
    const response = await apiClient.post(`/feed/${id}/like`);

    return response.data.data;
  },
  bookmarkFeedItem: async (id: string) => {
    const response = await apiClient.post(`/feed/${id}/bookmark`);
    return response.data.data;
  },
};

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get("/categories");
    return response.data.data;
  },
};
