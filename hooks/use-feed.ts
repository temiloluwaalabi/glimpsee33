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
import { useAppStore } from "@/store/use-app-store";
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
      log.debug("Fetching feed page", { pageParam, query });
      const result = await feedService.getFeedItems({
        ...query,
        page: pageParam,
      });

      if (ApiError.isApiError(result)) {
        logger.error("Error detected in infinite query", result);
        throw result;
      }

      return result;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.rawResponse?.pagination;
      if (pagination?.hasNext) {
        return pagination.page + 1;
      }
      return undefined;
    },
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

export const useGetBookmarkedFeeds = (enabled: true) => {
  const { getBookmarkIds } = useAppStore();
  console.log("BOOKMARK IDS", getBookmarkIds());

  return useQuery({
    queryKey: ["bookmarked-feeds", getBookmarkIds()],
    queryFn: async () => {
      const bookmarkIds = getBookmarkIds();

      if (bookmarkIds.length === 0) {
        return [];
      }

      // Fetch all feeds from the server
      const serverBookmarked = await feedService.getFeedItems();
      if (ApiError.isApiError(serverBookmarked)) {
        console.log(
          "Error fetching server bookmarked feeds:",
          serverBookmarked
        );
        throw serverBookmarked;
      }
      const bookmarkedD = serverBookmarked.data as FeedItem[];
      // Only include feeds that are both bookmarked on the server and still in local bookmarks
      const data = bookmarkedD.filter(
        (mark) => mark.isBookmarked === true && bookmarkIds.includes(mark.id)
      );

      // Get feeds for local bookmark IDs that might not be on server yet
      const localBookmarkIds = bookmarkIds.filter(
        (id) => !data.some((feed) => feed.id === id)
      );

      let localBookmarkedFeeds: FeedItem[] = [];

      if (localBookmarkIds.length > 0) {
        // Fetch individual feeds for local bookmarks
        const localFeedPromises = localBookmarkIds.map(async (id) => {
          try {
            const feed = await feedService.getFeedItem(id);
            const mainFeed = feed.data as FeedItem;

            if (!ApiError.isApiError(feed)) {
              return { ...mainFeed, isBookmarked: true }; // Mark as bookmarked locally
            }
            return null;
          } catch (error) {
            console.warn(`Failed to fetch bookmarked feed ${id}:`, error);
            return null;
          }
        });

        const localFeeds = await Promise.all(localFeedPromises);
        localBookmarkedFeeds = localFeeds.filter(Boolean) as FeedItem[];
      }

      // Combine server bookmarked and local bookmarked feeds
      const allBookmarkedFeeds = [...data, ...localBookmarkedFeeds];

      // Remove duplicates and sort by most recent
      const uniqueFeeds = allBookmarkedFeeds.reduce((acc, feed) => {
        if (
          !acc.some((existing) => existing.id === feed.id) &&
          bookmarkIds.includes(feed.id) // Only include if still bookmarked locally
        ) {
          acc.push(feed);
        }
        return acc;
      }, [] as FeedItem[]);

      return uniqueFeeds.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled,
    // Refetch when bookmarks change
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
export const useGetFavoritedFeeds = (enabled: true) => {
  const { getFavoriteIds } = useAppStore();

  return useQuery({
    queryKey: ["favorited-feeds", getFavoriteIds()],
    queryFn: async () => {
      const favoriteIds = getFavoriteIds();

      if (favoriteIds.length === 0) {
        return [];
      }

      // Fetch all feeds from the server
      const serverFavorited = await feedService.getFeedItems();
      if (ApiError.isApiError(serverFavorited)) {
        console.log("Error fetching server favorited feeds:", serverFavorited);
        throw serverFavorited;
      }
      const favoredData = serverFavorited.data as FeedItem[];
      // Only include feeds that are both liked on the server and still in local favorites
      const data = favoredData.filter(
        (mark) => mark.isLiked === true && favoriteIds.includes(mark.id)
      );

      // Get feeds for local favorite IDs that might not be on server yet
      const localFavoriteIds = favoriteIds.filter(
        (id) => !data.some((feed) => feed.id === id)
      );

      let localFavoritedFeeds: FeedItem[] = [];

      if (localFavoriteIds.length > 0) {
        // Fetch individual feeds for local favorites
        const localFeedPromises = localFavoriteIds.map(async (id) => {
          try {
            const feed = await feedService.getFeedItem(id);
            const mainFeed = feed.data as FeedItem;
            if (!ApiError.isApiError(feed)) {
              return { ...mainFeed, isLiked: true }; // Mark as liked locally
            }
            return null;
          } catch (error) {
            console.warn(`Failed to fetch favorited feed ${id}:`, error);
            return null;
          }
        });

        const localFeeds = await Promise.all(localFeedPromises);
        localFavoritedFeeds = localFeeds.filter(Boolean) as FeedItem[];
      }

      // Combine server favorited and local favorited feeds
      const allFavoritedFeeds = [...data, ...localFavoritedFeeds];

      // Remove duplicates and only include feeds that are still in local favorites
      const uniqueFeeds = allFavoritedFeeds.reduce((acc, feed) => {
        if (
          !acc.some((existing) => existing.id === feed.id) &&
          favoriteIds.includes(feed.id)
        ) {
          acc.push(feed);
        }
        return acc;
      }, [] as FeedItem[]);

      return uniqueFeeds.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
