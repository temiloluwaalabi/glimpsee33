import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { categoryService, FeedQuery, feedService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/api-client";
import logger, { log } from "@/lib/logger";
import { handleMutationError } from "@/lib/query/handle-mutation-error";
import { FeedItem, SearchFilters } from "@/types";

export const feedKeys = {
  all: ["feed"] as const,
  lists: () => [...feedKeys.all, "list"] as const,
  list: (filters: Partial<SearchFilters>) =>
    [...feedKeys.lists(), filters] as const,
  details: () => [...feedKeys.all, "detail"] as const,
  detail: (id: string) => [...feedKeys.details(), id] as const,
  search: (query: string, filters?: Partial<SearchFilters>) =>
    [...feedKeys.all, "search", query, filters] as const,
  categories: ["categories"] as const,
};

export const useFeedItems = (query: Partial<FeedQuery> = {}) => {
  return useQuery({
    queryKey: ["feed", "query"],
    queryFn: async () => {
      const result = await feedService.getFeedItems(query);

      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteFeedItems = (
  query: Omit<Partial<FeedQuery>, "page"> = {}
) => {
  return useInfiniteQuery({
    queryKey: feedKeys.list(query),
    queryFn: async ({ pageParam = 1 }) => {
      const result = await feedService.getFeedItems({
        ...query,
        page: pageParam,
      });

      log.debug("Fetching feed page", { pageParam, query });
      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
    },
    getNextPageParam: (lastPage: {
      data?: { pagination?: { hasMore: boolean; page: number } };
    }) =>
      lastPage.data?.pagination?.hasMore
        ? lastPage.data.pagination.page + 1
        : undefined,
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useFeedItem = (id: string) => {
  return useQuery({
    queryKey: feedKeys.detail(id),
    queryFn: async () => {
      log.debug("Fetching feed item", { id });
      const result = await feedService.getFeedItem(id);
      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }
      return result;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export function useSearchFeed(query: string, filters?: Partial<FeedQuery>) {
  return useQuery({
    queryKey: feedKeys.search(query, filters),
    queryFn: async () => {
      log.debug("Searching feed", { query, filters });
      const result = await feedService.getFeedItems(filters, {
        searchKey: query,
      });

      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
      // const response = await
    },
    enabled: query.length > 0,
    staleTime: 1 * 60 * 1000, // 1 minute - search results change more frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePrefetchFeedItem() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: feedKeys.detail(id),
      queryFn: async () => {
        log.debug("Fetching feed item", { id });
        const result = await feedService.getFeedItem(id);
        if (ApiError.isApiError(result)) {
          console.log("Error detected in query, throwing", result);
          throw result;
        }
        return result;
      },
      staleTime: 5 * 60 * 1000,
    });
  };
}
export const useLikeFeedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      log.userAction("LIKE_FEED_ITEM", undefined, { id });
      const result = await feedService.likeFeedItem(id);

      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        feedKeys.detail(variables.id),
        (old: FeedItem) => {
          if (!old) return old;
          return {
            ...old,
            liked: true,
            likes: data.success ? old.likes + 1 : Math.max(0, old.likes - 1),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() });
      logger.info("Feed liked successfully");
      toast.success("Feed liked successfully");
    },
    onError: handleMutationError,
  });
};

export const useBookmarkFeedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      log.userAction("BOOKMARK_FEED_ITEM", undefined, { id });

      return feedService.bookmarkFeedItem(id);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        feedKeys.detail(variables.id),
        (old: FeedItem) => {
          if (old) {
            return {
              ...old,
              isBookmarked: true,
            };
          }
        }
      );
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: feedKeys.categories,
    queryFn: async () => {
      log.debug("Fetching categories");
      const response = categoryService.getCategories;
      if (ApiError.isApiError(response)) {
        console.log("Error detected in query, throwing", response);
        throw response;
      }

      return response;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export function useInvalidatedFeeds() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: feedKeys.all }),
    invalidateLists: () =>
      queryClient.invalidateQueries({ queryKey: feedKeys.lists() }),
    invalidateDetail: (id: string) =>
      queryClient.invalidateQueries({ queryKey: feedKeys.detail(id) }),
    invalidateCategories: () =>
      queryClient.invalidateQueries({ queryKey: feedKeys.categories }),
  };
}
