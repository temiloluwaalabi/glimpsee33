/* eslint-disable @typescript-eslint/no-explicit-any */

import { FeedQuery } from "@/lib/api/api";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  publishedAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  readTime: number; // in minutes
  featured: boolean;
}
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  newPosts: boolean;
  likes: boolean;
  comments: boolean;
}

export interface PrivacySettings {
  profileVisible: boolean;
  activityVisible: boolean;
  emailVisible: boolean;
}
export interface UserPreferences {
  defaultView: "grid" | "list";
  defaultSort: string;
  theme: "light" | "dark" | "system";
  // language: string;
  // notifications: NotificationSettings;
  // privacy: PrivacySettings;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  role: "user" | "admin" | "moderator";
  createdAt: string;
  preferences: UserPreferences;
}

export interface ApiResponse<T> {
  status?: boolean;
  message?: string;
  success?: boolean;
  timestamp?: string;
  [key: string]: T | string | boolean | undefined;
}

export interface PaginatedResponse<T> {
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
  success: boolean;
  timestamp: string;
}

export interface SearchFilters {
  query: string;
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

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  parentId?: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number;
}

export interface AppState {
  // FEED STATE
  filters: FeedQuery;
  user: User | null;
  isAuthenticated: boolean;
  preference: UserPreferences;
  toasts: Toast[];
  loading: Record<string, LoadingState>;
}

// API Error types
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export interface MetricData {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  readTime: number;
  bounceRate: number;
}

// Feature flags
export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description: string;
  rolloutPercentage: number;
}

// SEO Meta types
export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogType: string;
  twitterCard: string;
  canonical: string;
  robots: string;
}
