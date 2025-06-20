import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { categoryService, FeedQuery, feedService } from "@/lib/api/api";
import { ApiError } from "@/lib/api/api-client";
import logger from "@/lib/logger";
import { handleMutationError } from "@/lib/query/handle-mutation-error";

export const useFeedItems = (query: FeedQuery = {}) => {
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

export const useInfiniteFeedItems = (query: Omit<FeedQuery, "page"> = {}) => {
  return useInfiniteQuery({
    queryKey: ["feed-infinite", query],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await feedService.getFeedItems({
        ...query,
        page: pageParam,
      });

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
  });
};
export const useFeedItem = (id: string) => {
  return useQuery({
    queryKey: ["feed", id],
    queryFn: async () => {
      const result = await feedService.getFeedItem(id);

      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
    },
    enabled: !!id,
  });
};

export const useLikeFeedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await feedService.likeFeedItem(id);

      if (ApiError.isApiError(result)) {
        console.log("Error detected in query, throwing", result);
        throw result;
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      logger.info("Feed liked successfully");
      toast.success("Feed liked successfully");
    },
    onError: handleMutationError,
  });
};

export const useBookmarkFeedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedService.bookmarkFeedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};
