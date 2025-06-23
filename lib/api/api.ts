import { Category, FeedItem, User } from "@/types";

import { ApiError } from "./api-client";
import { makeApiRequest } from "./api-request-setup";
import { LoginSchemaType, RegisterSchemaType } from "../validations";

export interface FeedQuery {
  page: number;
  limit: number;
  category: string;
  search: string;
  globalSearch: string;
  featured: boolean;
  authorId: string;
  startDate: string;
  endDate: string;
  viewMode: "grid" | "list";
  sortBy: "newest" | "oldest" | "popular" | "trending";
}

export interface UserQuery {
  search?: string;
  role?: "user" | "admin" | "moderator";
  page?: number;
  limit?: number;
  sortBy?: "newest" | "oldest" | "popular" | "trending";
}
export interface URLStateConfig extends Partial<FeedQuery> {
  [key: string]: string | number | boolean | undefined | null | Date;
}

export interface SearchFilters {
  query: string;
  limit: number;
  page: number;
  category: string;
  tags: string[];
  author: string;
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: "newest" | "oldest" | "popular" | "trending";
  featured: boolean;
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
  getFeedItems: async (
    query: Partial<FeedQuery> = {},
    options?: { searchKey?: string }
  ) => {
    const params = {
      ...query,
      ...(options?.searchKey ? { [options.searchKey]: query.search } : {}),
    };

    const result = await makeApiRequest<{
      items: FeedItem[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
    }>("/feed", "GET", {
      params,
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
  getCategories: async (
    query: Partial<FeedQuery> = {},
    options?: { searchKey?: string }
  ) => {
    const params = {
      ...query,
      ...(options?.searchKey ? { [options.searchKey]: query.search } : {}),
    };

    const result = await makeApiRequest<Category[]>("/categories", "GET", {
      params,
    });

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
  getCategoryItem: async (id: string) => {
    const result = await makeApiRequest<FeedItem>(`/categories/${id}`, "GET");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
};

export interface AuthResponse {
  success: boolean;
  user?: Partial<User>;
  message?: string;
  error?: string;
}

export const authService = {
  login: async (credentials: LoginSchemaType) => {
    const result = await makeApiRequest<AuthResponse>("/auth/login", "POST", {
      body: credentials,
    });

    console.log("RESULT", result);

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
  register: async (credentials: RegisterSchemaType) => {
    const result = await makeApiRequest<AuthResponse>(
      "/auth/register",
      "POST",
      {
        body: credentials,
      }
    );

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
  logout: async () => {
    const result = await makeApiRequest<AuthResponse>("/auth/logout", "POST");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },

  getCurrentUser: async () => {
    const result = await makeApiRequest<FeedItem>(`/auth/me`, "GET");

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
  checkAuth: async (): Promise<boolean> => {
    try {
      await authService.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  },
  getUsers: async (
    query: Partial<UserQuery> = {},
    options?: { searchKey?: string }
  ) => {
    const params = {
      ...query,
      ...(options?.searchKey ? { [options.searchKey]: query.search } : {}),
    };

    const result = await makeApiRequest<{
      data: User[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
      message: string;
      success: boolean;
    }>("/users", "GET", {
      params,
    });

    if (result instanceof ApiError) {
      return ApiError.markAsError(result);
    }

    return result;
  },
};
