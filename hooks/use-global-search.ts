"use client";

import { useQuery } from "@tanstack/react-query";

import {
  authService,
  categoryService,
  FeedQuery,
  feedService,
} from "@/lib/api/api";
import { ApiError } from "@/lib/api/api-client";
import { FeedItem, Category, User } from "@/types";

export interface GlobalSearchResult {
  feedItems: FeedItem[];
  categories: Category[];
  users: User[];
  totalResults: number;
}

export type GlobalSearchQuery = FeedQuery & {
  type?: "all" | "feeditem" | "category" | "user";
};

export const useGlobalSearch = (query: Partial<GlobalSearchQuery> = {}) => {
  return useQuery({
    queryKey: ["globalSearch", query.search, query.type],
    queryFn: async (): Promise<GlobalSearchResult> => {
      if (!query.search?.trim()) {
        return {
          feedItems: [],
          categories: [],
          users: [],
          totalResults: 0,
        };
      }

      try {
        const promises = [];

        if (query.type === "all" || query.type === "feeditem") {
          const result = await feedService.getFeedItems({
            search: query.search,
          });
          const data = result.data as FeedItem[];
          promises.push(
            Promise.resolve({
              data,
              total: data.length,
            })
          );
        } else {
          promises.push(Promise.resolve({ data: [], total: 0 }));
        }

        // Search categories
        if (query.type === "all" || query.type === "category") {
          const categories = await categoryService.getCategories(query);
          const data = categories.data as Category[];
          promises.push(
            Promise.resolve({
              data,
              total: data.length,
            })
          );
        } else {
          promises.push(Promise.resolve({ data: [], total: 0 }));
        }

        // Search users
        if (query.type === "all" || query.type === "user") {
          const users = await authService.getUsers(query);
          const data = users.data as User[];
          promises.push({
            data,
            total: data.length,
          });
        } else {
          promises.push(Promise.resolve({ data: [], total: 0 }));
        }

        const [feedResult, categoryResult, userResult] =
          await Promise.all(promises);
        // Handle API errors
        if (ApiError.isApiError(feedResult)) throw feedResult;
        if (ApiError.isApiError(categoryResult)) throw categoryResult;
        if (ApiError.isApiError(userResult)) throw userResult;

        const result: GlobalSearchResult = {
          feedItems: (feedResult.data as FeedItem[]) || [],
          categories: (categoryResult.data as Category[]) || [],
          users: (userResult.data as User[]) || [],
          totalResults:
            (feedResult.total || 0) +
            (categoryResult.total || 0) +
            (userResult.total || 0),
        };
        return result;
      } catch (error) {
        console.error("Global search error:", error);
        throw error;
      }
    },
    enabled: !!query.search?.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};
