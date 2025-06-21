// @flow
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Separator } from "@radix-ui/react-separator";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Grid, List, Search, TrendingUp, X } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { sortOptions } from "@/config/constants";
import { useInfiniteFeedItems } from "@/hooks/use-feed";
import { useFeedState } from "@/hooks/use-feed-state";
import { useURLState } from "@/hooks/use-url-state";

import FilterPills from "./filter-pills";

// Loading Skeleton Component
const FeedItemSkeleton = ({ view = "grid" }: { view: "grid" | "list" }) => {
  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <Skeleton className="h-32 w-48 flex-shrink-0" />
          <CardContent className="flex-1 p-4">
            <Skeleton className="mb-2 h-6" />
            <Skeleton className="mb-2 h-4" />
            <Skeleton className="mb-3 h-4 w-3/4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4">
        <div className="mb-3 flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mb-2 h-6" />
        <Skeleton className="mb-2 h-4" />
        <Skeleton className="mb-4 h-4 w-3/4" />
        <div className="mb-4 flex gap-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
        <Separator className="mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export const FeedArchivePage = () => {
  const feedState = useFeedState();
  const { filters, setSortBy, setViewMode, resetFilters, activeFiltersCount } =
    feedState;
  const [localSearchQuery, setLocalSearchQuery] = React.useState(
    filters.search
  );
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  useURLState();

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLocalSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, setLocalSearchQuery]);

  // sync local search with store when store changes externally

  React.useEffect(() => {
    setLocalSearchQuery(filters.search);
  }, [filters.search, setLocalSearchQuery]);

  // // Define the type for the page data returned by useInfiniteFeedItems
  // type FeedPage = {
  //   data: {
  //     pagination?: {
  //       total?: number;
  //       [key: string]: any;
  //     };
  //     [key: string]: any;
  //   };
  //   [key: string]: any;
  // };

  // Infinite query for feed items
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteFeedItems();

  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  console.log("DATA", data);
  // Get all feed items from pages
  const allItems = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = 10;

  const handleRetry = () => {
    refetch();
  };

  const viewMode = filters.viewMode;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error
              ? error.message
              : "Failed to load feed items"}
          </p>
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          {/* Main Search and Controls */}
          <div className="mb-4 flex flex-col gap-4 lg:flex-row">
            {/* Enhanced Search Bar */}
            <div className="group relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
              </div>
              <Input
                placeholder="Discover amazing content..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 bg-white/50 pr-4 pl-12 text-lg shadow-sm backdrop-blur-sm focus:border-blue-500"
              />
              {localSearchQuery && (
                <button
                  onClick={() => {
                    setLocalSearchQuery("");
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <Select value={filters.sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 w-44 rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-gray-500">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex overflow-hidden rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                <Button
                  variant={filters.viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-12 rounded-none px-4 ${
                    filters.viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={filters.viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-12 rounded-none px-4 ${
                    filters.viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Button (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="relative h-12 rounded-xl border-2 border-gray-200 bg-white/50 px-4 backdrop-blur-sm lg:hidden"
              >
                <Filter className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {activeFiltersCount}
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className={`${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <FilterPills />
          </div>

          {/* Active Filters & Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    {activeFiltersCount} filter
                    {activeFiltersCount > 1 ? "s" : ""} active
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-6 px-2 text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {totalCount > 0 && (
              <div className="text-sm font-medium text-gray-600">
                {totalCount.toLocaleString()} articles found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-6"
              }
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <FeedItemSkeleton key={i} view={viewMode} />
              ))}
            </motion.div>
          ) : allItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                No articles found
              </h3>
              <p className="mx-auto mb-6 max-w-md text-gray-600">
                We couldn&apos;t find any content matching your criteria. Try
                adjusting your search or explore different categories.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Clear Filters & Explore
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-6"
              }
            >
              {/* {allItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`/feed/${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                  className="block group"
                >
                  <FeedItemCard item={item} view={viewMode} />
                </motion.a>
              ))} */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Infinite Scroll Trigger */}
        {hasNextPage && (
          <div ref={intersectionRef} className="flex justify-center py-12">
            {isFetchingNextPage ? (
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="font-medium text-gray-600">
                  Loading more amazing content...
                </span>
              </motion.div>
            ) : (
              <Button
                onClick={() => fetchNextPage()}
                variant="outline"
                size="lg"
                className="rounded-xl border-2 border-gray-200 px-8 hover:border-blue-500 hover:text-blue-600"
              >
                Load More Articles
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
