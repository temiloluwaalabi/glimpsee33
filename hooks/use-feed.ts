import { categoryService, FeedQuery, feedService } from "@/lib/query/service-query";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query"

  

  export const useFeedItems = (query: FeedQuery = {}) => {
    return useQuery({
        queryKey: ['feed', 'query'],
        queryFn: () => feedService.getFeedItems(query),
        staleTime: 5 * 60 * 1000,
    })
  }

  export const useInfiniteFeedItems = (query: Omit<FeedQuery, 'page'> = {}) => {
    return useInfiniteQuery({
        queryKey: ['feed-infinite', query],
        queryFn: ({pageParam = 1}) => feedService.getFeedItems({...query, page: pageParam}),
        getNextPageParam: (lastPage) => lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
        initialPageParam: 1,
    })
  }
  export const useFeedItem = (id: string) => {
  return useQuery({
    queryKey: ['feed', id],
    queryFn: () => feedService.getFeedItem(id),
    enabled: !!id,
  });
};

export const useLikeFeedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedService.likeFeedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useBookmarkFeedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedService.bookmarkFeedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};