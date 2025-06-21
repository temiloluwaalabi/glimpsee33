import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { FeedQuery } from '@/lib/api/api';
import type { AppState, User, Toast, LoadingState } from '@/types';

interface AppStore extends AppState {
  viewMode: 'grid' | 'list',
  cache: {
    categories: string[];
    recentSearches: string[]
  } 
}

export interface AppActions {
 // Auth actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  
  // UI actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
 
  
  setSearchQuery: (query: string) => void;
  setGlobalSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (view: "grid" | "list") => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  // Search & Filter actions
  updateFilters: (filters: Partial<FeedQuery>) => void;
  syncFromURL: (urlParams: Record<string, string>) => void

  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Loading actions
  setLoading: (key: string, state: LoadingState) => void;
  clearLoading: (key: string) => void;
  
  // Utility actions
  reset: () => void;

  updatePreference: (preference: Partial<AppState['preference']>) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  updateCategories: (categories: string[]) => void

  // Utility getters
  getSearchQuery: () => string;
  getSelectedCategory: () => string;
  getSortBy: () => string;
  getViewMode: () => 'grid' | 'list';
  getActiveFiltersCount: () => number;
}
const initialSearchFilters: FeedQuery = {
  page: 1,
  limit: 10,
  category: '',
  search: '',
  globalSearch: "",
  featured: false,
  authorId: '',
  startDate: '',
  endDate: '',
  sortBy: 'newest',
  viewMode: "grid"
};

const DEFAULT_PREFERENCES = {
    defaultView: "grid" as const,
  defaultSort: 'newest',
  theme: "dark" as const,
}

const initialState: AppStore = {
  viewMode: "grid" as const,
  filters:{...initialSearchFilters},
  user: null,
  isAuthenticated: false,
  preference: { ...DEFAULT_PREFERENCES },
  toasts: [],
  loading: {},
  cache: {
    categories: [],
    recentSearches: [],
  },
  // Add any missing AppState properties with their initial values here
};

export const useAppStore = create<AppStore & AppActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        // Auth actions
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),

        login: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
          }),

        logout: () =>
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
          }),

        // UI actions
        setTheme: (theme) =>
          set((state) => {
            state.preference.theme = theme;
          }),

        setViewMode: (view: 'grid' | 'list') =>
          set((state) => {
            state.preference.defaultView = view;
            state.preference.defaultView = view
          }),

        setSortBy: (sort) =>
          set((state) => {
            state.filters.sortBy = sort;
            state.filters.page = 1
          }),

        setSelectedCategory: (category) =>
          set((state) => {
            state.filters.category = category;
            state.filter.page = 1
          }),

      setSearchQuery: (query: string) =>
          set((state) => {
            state.filters.search = query;
            state.filters.page = 1; // Reset page when searching
            
            // Add to recent searches if not empty and not already present
            if (query.trim() && !state.cache.recentSearches.includes(query.trim())) {
              state.cache.recentSearches.unshift(query.trim());
              // Keep only last 10 searches
              state.cache.recentSearches = state.cache.recentSearches.slice(0, 10);
            }
          }),
      setGlobalSearchQuery: (query: string) =>
          set((state) => {
            state.filters.globalSearch = query;
            state.filters.page = 1; // Reset page when searching
            
            // Add to recent searches if not empty and not already present
            if (query.trim() && !state.cache.recentSearches.includes(query.trim())) {
              state.cache.recentSearches.unshift(query.trim());
              // Keep only last 10 searches
              state.cache.recentSearches = state.cache.recentSearches.slice(0, 10);
            }
          }),

        setPage: (page) =>
          set((state) => {
            state.filters.page = page;
          }),

        resetFilters: () =>
          set((state) => {
            state.filters = { ...initialSearchFilters, };
          }),

        // Search & Filter actions
        updateFilters: (filters) =>
          set((state) => {
            state.filters = { ...state.filters, ...filters };
          }),

        syncFromURL: (urlParams: Record<string, string>) =>
          set((state) => {
            const newFilters: Partial<FeedQuery> = {};

            if(urlParams.search !== undefined){
              newFilters.search = urlParams.search || ''
            }

            if(urlParams.category !== undefined){
              newFilters.category = urlParams.category || "all"
            }

            if (urlParams.featured !== undefined) {
              newFilters.featured = urlParams.featured === 'true';
            }

            if (urlParams.authorId !== undefined) {
              newFilters.authorId = urlParams.authorId || '';
            }

            if (urlParams.startDate !== undefined) {
              newFilters.startDate = urlParams.startDate || '';
            }

            if (urlParams.endDate !== undefined) {
              newFilters.endDate = urlParams.endDate || '';
            }

            if(urlParams.limit !== undefined){
              newFilters.limit = Number(urlParams.limit) || 10
            }

            if(urlParams.sort !== undefined){
              const allowedSorts = ["newest", "oldest", "popular", "trending"] as const;
              newFilters.sortBy = allowedSorts.includes(urlParams.sort as typeof allowedSorts[number])
                ? urlParams.sort as typeof allowedSorts[number]
                : "newest";
            }
  if (urlParams.view !== undefined) {
              newFilters.viewMode = (urlParams.view as 'grid' | 'list') || 'grid';
            }
            if (urlParams.page !== undefined) {
              newFilters.page = parseInt(urlParams.page, 10) || 1;
            }
            



            Object.entries(urlParams).forEach(([key, value]) => {
              if (key in state.filters) {
                state.filters[key] = value;
              }
            });
          }),

        // Toast actions
        addToast: (toast) =>
          set((state) => {
            const id = Math.random().toString(36).substr(2, 9);
            state.toasts.push({ ...toast, id });
          }),

        removeToast: (id) =>
          set((state) => {
            state.toasts = state.toasts.filter((toast: Toast) => toast.id !== id);
          }),

        clearToasts: () =>
          set((state) => {
            state.toasts = [];
          }),

        // Loading actions
        setLoading: (key, loadingState) =>
          set((state) => {
            state.loading[key] = loadingState;
          }),

        clearLoading: (key) =>
          set((state) => {
            delete state.loading[key];
          }),

        // Utility actions
        reset: () =>
          set(() => ({
            ...initialState,
          })),

        updatePreference: (preference) =>
          set((state) => {
            state.preference = { ...state.preference, ...preference };
          }),

        addRecentSearch: (query: string) =>
          set((state) => {
            if (!state.cache.recentSearches.includes(query.trim())) {
              state.cache.recentSearches.unshift(query.trim());
              if (state.cache.recentSearches.length > 10) {
                state.cache.recentSearches = state.cache.recentSearches.slice(0, 10);
              }
            }
          }),

        clearRecentSearches: () =>
          set((state) => {
            state.cache.recentSearches = [];
          }),

        updateCategories: (categories) =>
          set((state) => {
            state.cache.categories = categories;
          }),

        // Utility getters
        getSearchQuery: () => get().filters.search,
        getSelectedCategory: () => get().filters.category,
        getSortBy: () => get().filters.sortBy,
        getViewMode: () => get().preference.defaultView,
        getActiveFiltersCount: () => {
          const { filters } = get();
          let count = 0;
          Object.entries(filters).forEach(([key, value]) => {
            if (
              key !== 'page' &&
              key !== 'limit' &&
              value !== '' &&
              value !== "all" &&
              value !== "newest" &&
              value !== false &&
              value !== null &&
              value !== undefined
            ) {
              count++;
            }
          });
          return count;
        },
      })),
      {
        name: 'glimpse33-feed-explorer',
        partialize: (state) => ({
          preference: state.preference,
          cache: state.cache,
        }),
      }
    ),
    {
      name: 'AppStore',
    }
  )
);

// Selectors
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useFilters = () => useAppStore((state) => state.filters);
export const usePreferences = () => useAppStore((state) => state.preference);
export const useCache = () => useAppStore((state) => state.cache);
// export const useUIState = () => useAppStore((state) => ({
//   isLoading: state.isLoading,
//   error: state.error,
// }));

// Legacy selectors for backward compatibility
export const useSearchQuery = () => useAppStore((state) => state.filters.search);
export const useSelectedCategory = () => useAppStore((state) => state.filters.category);
export const useSortBy = () => useAppStore((state) => state.filters.sortBy);
export const useViewMode = () => useAppStore((state) => state.filters.viewMode);
export const useToasts = () => useAppStore((state) => state.toasts);
export const useLoading = (key: string) => useAppStore((state) => state.loading[key]);