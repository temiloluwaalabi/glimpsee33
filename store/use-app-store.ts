/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FeedQuery } from "@/lib/api/api";
import type { AppState, User, Toast, LoadingState } from "@/types";

interface AppStore extends AppState {
  viewMode: "grid" | "list";
  cache: {
    categories: string[];
    recentSearches: string[];
  };
  bookmarks: Set<string>;
  favorites: Set<string>;
}

export interface AppActions {
  // Auth actions
  setUser: (user: Partial<User> | null) => void;
  login: (user: Partial<User>) => void;
  logout: () => void;

  // UI actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  setSearchQuery: (query: string) => void;
  setGlobalSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: "newest" | "oldest" | "popular" | "trending") => void;
  setViewMode: (view: "grid" | "list") => void;
  setPage: (page: number) => void;
  resetFilters: () => void;

  // Search & Filter actions
  updateFilters: (filters: Partial<FeedQuery>) => void;
  syncFromURL: (urlParams: Record<string, string>) => void;

  // Toast actions
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Loading actions
  setLoading: (key: string, state: LoadingState) => void;
  clearLoading: (key: string) => void;

  // Utility actions
  reset: () => void;
  updatePreference: (preference: Partial<AppState["preference"]>) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  updateCategories: (categories: string[]) => void;

  // Utility getters
  getSearchQuery: () => string;
  getSelectedCategory: () => string;
  getSortBy: () => "newest" | "oldest" | "popular" | "trending";
  getViewMode: () => "grid" | "list";
  getActiveFiltersCount: () => number;

  // Bookmark actions
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  getBookmarkIds: () => string[];

  // Favorites actions
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorited: (id: string) => boolean;
  getFavoriteIds: () => string[];

  // Utility actions
  clearAllBookmarks: () => void;
  clearAllFavorites: () => void;
}

const initialSearchFilters: FeedQuery = {
  page: 1,
  limit: 10,
  category: "",
  search: "",
  globalSearch: "",
  featured: false,
  authorId: "",
  startDate: "",
  endDate: "",
  sortBy: "newest",
  viewMode: "grid",
};

const DEFAULT_PREFERENCES = {
  defaultView: "grid" as const,
  defaultSort: "newest" as const,
  theme: "dark" as const,
};

const initialState: AppStore = {
  viewMode: "grid" as const,
  filters: { ...initialSearchFilters },
  user: null,
  isAuthenticated: false,
  preference: { ...DEFAULT_PREFERENCES },
  toasts: [],
  loading: {},
  cache: {
    categories: [],
    recentSearches: [],
  },
  bookmarks: new Set<string>(),
  favorites: new Set<string>(),
};

export const useAppStore = create<AppStore & AppActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      bookmarks: new Set<string>(),
      favorites: new Set<string>(),
      // Auth actions
      setUser: (user) =>
        set((state) => ({
          ...state,
          user,
          isAuthenticated: !!user,
        })),

      login: (user) =>
        set((state) => ({
          ...state,
          user,
          isAuthenticated: true,
        })),

      logout: () =>
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
        })),

      // UI actions
      setTheme: (theme) =>
        set((state) => ({
          ...state,
          preference: {
            ...state.preference,
            theme,
          },
        })),

      setViewMode: (view: "grid" | "list") =>
        set((state) => ({
          ...state,
          viewMode: view,
          preference: {
            ...state.preference,
            defaultView: view,
          },
          filters: {
            ...state.filters,
            viewMode: view,
          },
        })),

      setSortBy: (sort: "newest" | "oldest" | "popular" | "trending") =>
        set((state) => ({
          ...state,
          filters: {
            ...state.filters,
            sortBy: sort,
            page: 1,
          },
        })),

      setSelectedCategory: (category) =>
        set((state) => ({
          ...state,
          filters: {
            ...state.filters,
            category,
            page: 1,
          },
        })),

      setSearchQuery: (query: string) =>
        set((state) => {
          const trimmedQuery = query.trim();
          const newRecentSearches =
            trimmedQuery && !state.cache.recentSearches.includes(trimmedQuery)
              ? [trimmedQuery, ...state.cache.recentSearches.slice(0, 9)]
              : state.cache.recentSearches;

          return {
            ...state,
            filters: {
              ...state.filters,
              search: query,
              page: 1,
            },
            cache: {
              ...state.cache,
              recentSearches: newRecentSearches,
            },
          };
        }),

      setGlobalSearchQuery: (query: string) =>
        set((state) => {
          const trimmedQuery = query.trim();
          const newRecentSearches =
            trimmedQuery && !state.cache.recentSearches.includes(trimmedQuery)
              ? [trimmedQuery, ...state.cache.recentSearches.slice(0, 9)]
              : state.cache.recentSearches;

          return {
            ...state,
            filters: {
              ...state.filters,
              globalSearch: query,
              page: 1,
            },
            cache: {
              ...state.cache,
              recentSearches: newRecentSearches,
            },
          };
        }),

      setPage: (page) =>
        set((state) => ({
          ...state,
          filters: {
            ...state.filters,
            page,
          },
        })),

      resetFilters: () =>
        set((state) => ({
          ...state,
          filters: { ...initialSearchFilters },
        })),

      // Search & Filter actions
      updateFilters: (filters) =>
        set((state) => ({
          ...state,
          filters: {
            ...state.filters,
            ...filters,
          },
        })),

      syncFromURL: (urlParams: Record<string, string>) =>
        set((state) => {
          const updatedFilters = { ...state.filters };
          const updatedState = { ...state };

          // Handle search parameter
          if (urlParams.search !== undefined) {
            updatedFilters.search = urlParams.search || "";
          }

          // Handle category parameter
          if (urlParams.category !== undefined) {
            updatedFilters.category = urlParams.category || "";
          }

          // Handle featured parameter
          if (urlParams.featured !== undefined) {
            updatedFilters.featured = urlParams.featured === "true";
          }

          // Handle authorId parameter
          if (urlParams.authorId !== undefined) {
            updatedFilters.authorId = urlParams.authorId || "";
          }

          // Handle date parameters
          if (urlParams.startDate !== undefined) {
            updatedFilters.startDate = urlParams.startDate || "";
          }

          if (urlParams.endDate !== undefined) {
            updatedFilters.endDate = urlParams.endDate || "";
          }

          // Handle limit parameter
          if (urlParams.limit !== undefined) {
            const limit = Number(urlParams.limit);
            updatedFilters.limit = limit > 0 ? limit : 10;
          }

          // Handle sort parameter
          if (urlParams.sort !== undefined) {
            const allowedSorts = [
              "newest",
              "oldest",
              "popular",
              "trending",
            ] as const;
            updatedFilters.sortBy = allowedSorts.includes(
              urlParams.sort as (typeof allowedSorts)[number]
            )
              ? (urlParams.sort as (typeof allowedSorts)[number])
              : "newest";
          }

          // Handle view parameter
          if (urlParams.view !== undefined) {
            const view =
              (urlParams.view as "grid" | "list") === "list" ? "list" : "grid";
            updatedFilters.viewMode = view;
            updatedState.viewMode = view;
            updatedState.preference = {
              ...updatedState.preference,
              defaultView: view,
            };
          }

          // Handle page parameter
          if (urlParams.page !== undefined) {
            const page = parseInt(urlParams.page, 10);
            updatedFilters.page = page > 0 ? page : 1;
          }

          // Handle global search parameter
          if (urlParams.globalSearch !== undefined) {
            updatedFilters.globalSearch = urlParams.globalSearch || "";
          }

          return {
            ...updatedState,
            filters: updatedFilters,
          };
        }),

      // Toast actions
      addToast: (toast) =>
        set((state) => ({
          ...state,
          toasts: [
            ...state.toasts,
            { ...toast, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),

      removeToast: (id) =>
        set((state) => ({
          ...state,
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

      clearToasts: () =>
        set((state) => ({
          ...state,
          toasts: [],
        })),

      // Loading actions
      setLoading: (key, loadingState) =>
        set((state) => ({
          ...state,
          loading: {
            ...state.loading,
            [key]: loadingState,
          },
        })),

      clearLoading: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.loading;
          return {
            ...state,
            loading: rest,
          };
        }),

      // Utility actions
      reset: () => set(() => ({ ...initialState })),

      updatePreference: (preference) =>
        set((state) => ({
          ...state,
          preference: {
            ...state.preference,
            ...preference,
          },
        })),

      addRecentSearch: (query: string) =>
        set((state) => {
          const trimmedQuery = query.trim();
          if (
            !trimmedQuery ||
            state.cache.recentSearches.includes(trimmedQuery)
          ) {
            return state;
          }

          return {
            ...state,
            cache: {
              ...state.cache,
              recentSearches: [
                trimmedQuery,
                ...state.cache.recentSearches.slice(0, 9),
              ],
            },
          };
        }),

      clearRecentSearches: () =>
        set((state) => ({
          ...state,
          cache: {
            ...state.cache,
            recentSearches: [],
          },
        })),

      updateCategories: (categories) =>
        set((state) => ({
          ...state,
          cache: {
            ...state.cache,
            categories,
          },
        })),

      // Utility getters
      getSearchQuery: () => get().filters.search,
      getSelectedCategory: () => get().filters.category,
      getSortBy: () => get().filters.sortBy,
      getViewMode: () => get().filters.viewMode,
      getActiveFiltersCount: () => {
        const { filters } = get();
        let count = 0;

        // Count non-default filter values
        if (filters.search && filters.search.trim()) count++;
        if (filters.globalSearch && filters.globalSearch.trim()) count++;
        if (
          filters.category &&
          filters.category !== "" &&
          filters.category !== "all"
        )
          count++;
        if (filters.featured === true) count++;
        if (filters.authorId && filters.authorId.trim()) count++;
        if (filters.startDate && filters.startDate.trim()) count++;
        if (filters.endDate && filters.endDate.trim()) count++;
        if (filters.sortBy && filters.sortBy !== "newest") count++;
        if (filters.viewMode && filters.viewMode !== "grid") count++;

        return count;
      },

      // Bookmark actions
      addBookmark: (id: string) =>
        set((state) => ({
          bookmarks: new Set(state.bookmarks).add(id),
        })),

      removeBookmark: (id: string) =>
        set((state) => {
          const newBookmarks = new Set(state.bookmarks);
          newBookmarks.delete(id);
          return { ...state, bookmarks: newBookmarks };
        }),

      toggleBookmark: (id: string) => {
        const { bookmarks } = get();
        if (bookmarks.has(id)) {
          get().removeBookmark(id);
        } else {
          get().addBookmark(id);
        }
      },

      isBookmarked: (id: string) => {
        const bookmarks =
          get().bookmarks instanceof Set
            ? get().bookmarks
            : new Set(get().bookmarks);
        return bookmarks.has(id);
      },

      getBookmarkIds: () => Array.from(get().bookmarks),

      // Favorites actions
      addFavorite: (id: string) =>
        set((state) => ({
          favorites: new Set(state.favorites).add(id),
        })),

      removeFavorite: (id: string) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(id);
          return { favorites: newFavorites };
        }),

      toggleFavorite: (id: string) => {
        const { favorites } = get();
        if (favorites.has(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      isFavorited: (id: string) => {
        const favorites =
          get().favorites instanceof Set
            ? get().favorites
            : new Set(get().favorites);
        return favorites.has(id);
      },

      getFavoriteIds: () => Array.from(get().favorites),

      // Utility actions
      clearAllBookmarks: () => set({ bookmarks: new Set() }),
      clearAllFavorites: () => set({ favorites: new Set() }),
    }),
    {
      name: "app-store",
      partialize: (state) => {
        // Only persist relevant state, not methods
        const {
          user,
          isAuthenticated,
          preference,
          filters,
          viewMode,
          bookmarks,
          favorites,
        } = state;
        return {
          user,
          isAuthenticated,
          preference,
          filters,
          viewMode,
          bookmarks: Array.from(bookmarks),
          favorites: Array.from(favorites),
        };
      },
    }
  )
);

// Selectors
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated);
export const useFilters = () => useAppStore((state) => state.filters);
export const usePreferences = () => useAppStore((state) => state.preference);
export const useCache = () => useAppStore((state) => state.cache);
export const useToasts = () => useAppStore((state) => state.toasts);
export const useLoading = (key: string) =>
  useAppStore((state) => state.loading[key]);

// Convenient selectors for specific filter values
export const useSearchQuery = () =>
  useAppStore((state) => state.filters.search);
export const useGlobalSearchQuery = () =>
  useAppStore((state) => state.filters.globalSearch);
export const useSelectedCategory = () =>
  useAppStore((state) => state.filters.category);
export const useSortBy = () => useAppStore((state) => state.filters.sortBy);
export const useViewMode = () => useAppStore((state) => state.filters.viewMode);
export const useCurrentPage = () => useAppStore((state) => state.filters.page);
export const useActiveFiltersCount = () =>
  useAppStore((state) => state.getActiveFiltersCount());

// Utility hooks
export const useAppActions = () =>
  useAppStore((state) => ({
    setUser: state.setUser,
    login: state.login,
    logout: state.logout,
    setTheme: state.setTheme,
    setSearchQuery: state.setSearchQuery,
    setGlobalSearchQuery: state.setGlobalSearchQuery,
    setSelectedCategory: state.setSelectedCategory,
    setSortBy: state.setSortBy,
    setViewMode: state.setViewMode,
    setPage: state.setPage,
    resetFilters: state.resetFilters,
    updateFilters: state.updateFilters,
    syncFromURL: state.syncFromURL,
    addToast: state.addToast,
    removeToast: state.removeToast,
    clearToasts: state.clearToasts,
    setLoading: state.setLoading,
    clearLoading: state.clearLoading,
    reset: state.reset,
    updatePreference: state.updatePreference,
    addRecentSearch: state.addRecentSearch,
    clearRecentSearches: state.clearRecentSearches,
    updateCategories: state.updateCategories,
  }));
