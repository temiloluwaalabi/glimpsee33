"use client";

import { useCallback, useEffect, useRef } from "react";

import { FeedQuery } from "@/lib/api/api";
import { useAppStore } from "@/store/use-app-store";

import { useFeedURLState } from "./use-url-state";

/**
 * Custom hook that provides seamless integration between Zustand store and URL state
 * for the feed page. Handles bidirectional sync and prevents infinite update loops.
 */

export const useFeedState = () => {
  const { feedState, updateFeedState } = useFeedURLState();
  const store = useAppStore();
  const isInitialized = useRef(false);
  const lastURLUpdate = useRef<string>("");
  const lastStoreUpdate = useRef<string>("");

  // Create serialized versions for comparison
  const urlStateKey = JSON.stringify(feedState);
  const storeStateKey = JSON.stringify({
    search: store.filters.search,
    globalSearch: store.filters.globalSearch,
    category: store.filters.category,
    sortBy: store.filters.sortBy,
    viewMode: store.filters.viewMode,
    page: store.filters.page,
    featured: store.filters.featured,
  });

  // Initialize store from URL on first load
  useEffect(() => {
    if (!isInitialized.current) {
      // Fixed: swap search and globalSearch mapping
      const urlParams: Record<string, string> = {
        search: feedState.search ?? "", // This is the local search
        globalSearch: feedState.gSearch ?? "", // This is the global search (g param)
        sortBy: ["newest", "oldest", "popular", "trending"].includes(
          feedState.sortBy
        )
          ? feedState.sortBy
          : "newest",
        viewMode: feedState.viewMode ?? "grid",
        page: String(feedState.page ?? 1),
        category: feedState.category ?? "all",
        featured: String(feedState.featured ?? false), // Convert boolean to string
      };

      store.syncFromURL(urlParams);
      lastURLUpdate.current = urlStateKey;
      lastStoreUpdate.current = storeStateKey;
      isInitialized.current = true;
    }
  }, [
    feedState.category,
    feedState.gSearch,
    feedState.page,
    feedState.search,
    feedState.sortBy,
    feedState.viewMode,
    feedState.featured, // Added missing dependency
    store,
    storeStateKey,
    urlStateKey,
  ]);

  // Sync URL changes to store (when user navigates with browser back/forward)
  useEffect(() => {
    if (!isInitialized.current) return;

    if (
      urlStateKey !== lastURLUpdate.current &&
      urlStateKey !== lastStoreUpdate.current
    ) {
      // Fixed: correct the mapping between URL and store
      store.updateFilters({
        search: feedState.search, // Local search
        globalSearch: feedState.gSearch, // Global search
        category: feedState.category,
        sortBy: ["newest", "oldest", "popular", "trending"].includes(
          feedState.sortBy
        )
          ? (feedState.sortBy as "newest" | "oldest" | "popular" | "trending")
          : "newest",
        viewMode: feedState.viewMode,
        page: feedState.page,
        featured: feedState.featured, // Added missing featured
      });

      lastURLUpdate.current = urlStateKey;
      // Fixed: create correct store state for comparison
      lastStoreUpdate.current = JSON.stringify({
        search: feedState.search,
        globalSearch: feedState.gSearch,
        category: feedState.category,
        sortBy: ["newest", "oldest", "popular", "trending"].includes(
          feedState.sortBy
        )
          ? feedState.sortBy
          : "newest",
        viewMode: feedState.viewMode,
        page: feedState.page,
        featured: feedState.featured,
      });
    }
  }, [
    feedState.category,
    feedState.gSearch,
    feedState.page,
    feedState.search,
    feedState.sortBy,
    feedState.viewMode,
    feedState.featured, // Added missing dependency
    store,
    urlStateKey,
  ]);

  // Sync store changes to URL (when user interacts with filters)
  useEffect(() => {
    if (!isInitialized.current) return;

    if (
      storeStateKey !== lastStoreUpdate.current &&
      storeStateKey !== lastURLUpdate.current
    ) {
      updateFeedState({
        search: store.filters.search,
        globalSearch: store.filters.globalSearch,
        category: store.filters.category,
        sortBy: store.filters.sortBy,
        viewMode: store.filters.viewMode,
        page: store.filters.page,
        featured: store.filters.featured,
      });

      lastStoreUpdate.current = storeStateKey;
      lastURLUpdate.current = JSON.stringify({
        search: store.filters.search,
        globalSearch: store.filters.globalSearch,
        category: store.filters.category,
        sortBy: store.filters.sortBy,
        viewMode: store.filters.viewMode,
        page: store.filters.page,
        featured: store.filters.featured,
      });
    }
  }, [storeStateKey, store.filters, updateFeedState]);

  // Enhanced actions that update both store and URL
  const actions = {
    setGlobalSearchQuery: useCallback(
      // Fixed typo: was "setglobalSearchQuery"
      (query: string) => {
        store.setGlobalSearchQuery(query);
      },
      [store]
    ),
    setLocalSearchQuery: useCallback(
      (query: string) => {
        store.setSearchQuery(query);
      },
      [store]
    ),
    setSortBy: useCallback(
      (sort: "newest" | "oldest" | "popular" | "trending") => {
        store.setSortBy(sort);
      },
      [store]
    ),
    setSelectedCategory: useCallback(
      (category: string) => {
        store.setSelectedCategory(category);
      },
      [store]
    ),
    setViewMode: useCallback(
      (view: "grid" | "list") => {
        store.setViewMode(view);
      },
      [store]
    ),
    setPage: useCallback(
      (page: number) => {
        store.setPage(page);
      },
      [store]
    ),
    resetFilters: useCallback(() => {
      store.resetFilters();
    }, [store]),
    batchUpdate: useCallback(
      (updates: Partial<FeedQuery>) => {
        store.updateFilters(updates);
      },
      [store]
    ),
  };

  return {
    filters: store.filters,
    preference: store.preference,
    cache: store.cache,
    activeFiltersCount: store.getActiveFiltersCount(),
    ...actions,
    store,
    urlState: feedState,
  };
};

export const useFeedSearch = () => {
  const { filters, setLocalSearchQuery, setGlobalSearchQuery, cache } =
    useFeedState(); // Fixed typo

  return {
    localSearchQuery: filters.search,
    globalSearchQuery: filters.globalSearch,
    setLocalSearchQuery,
    setGlobalSearchQuery, // Fixed typo
    recentSearchs: cache.recentSearches,
    clearRecentSearches: useAppStore((state) => state.clearRecentSearches),
  };
};

export const useFeedFilters = () => {
  const {
    filters,
    setSortBy,
    setSelectedCategory,
    resetFilters,
    activeFiltersCount,
  } = useFeedState();

  return {
    selectedCategory: filters.category,
    sortBy: filters.sortBy,
    setSelectedCategory,
    setSortBy,
    resetFilters,
    activeFiltersCount,
  };
};

export const useFeedView = () => {
  const { filters, setViewMode, preference } = useFeedState();

  return {
    viewMode: filters.viewMode,
    setViewMode,
    defaultView: preference.defaultView,
  };
};

export const useFeedPagination = () => {
  const { filters, setPage } = useFeedState();

  return {
    currentPage: filters.page,
    setPage,
    goToNextPage: () => setPage(filters.page + 1),
    goToPreviousPage: () => setPage(Math.max(1, filters.page - 1)),
    goToFirstPage: () => setPage(1),
  };
};
