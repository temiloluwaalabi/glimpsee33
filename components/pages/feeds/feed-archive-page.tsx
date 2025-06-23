"use client";

import { Separator } from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Filter, Grid, List, Search, X } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { FeedItemCard } from "@/components/cards/feed-item-card";
import MaxWidthContainer from "@/components/layout/max-width-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { sortOptions } from "@/config/constants";
import { useInfiniteFeedItems } from "@/hooks/use-feed";
import { useFeedState } from "@/hooks/use-feed-state";
import { FeedItem } from "@/types";

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

export const FeedArchivePage = ({ category }: { category?: string }) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const feedState = useFeedState();
  const {
    filters,
    setSortBy,
    setViewMode,
    resetFilters,
    activeFiltersCount,
    setLocalSearchQuery: setLQ, // Use the action from the hook
  } = feedState;

  const [localSearchQuery, setLocalSearchQuery] = React.useState(
    filters.search
  );
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Ref for debounce timeout
  const debounceTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Debounced search with proper cleanup

  React.useEffect(() => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      setLQ(localSearchQuery);
    }, 300);

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearchQuery]);

  // Handle scroll for reading progress and scroll-to-top Button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
  } = useInfiniteFeedItems({
    category: category ?? (filters.category === "all" ? "" : filters.category),
    sortBy: filters.sortBy,
    search: filters.search,
  });

  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (filters.search === "") {
      setLocalSearchQuery("");
    }
  }, [filters.search]);
  // Infinite scroll effect with better dependency management
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Get all feed items from pages with better error handling
  const allItems = React.useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data || []);
  }, [data?.pages]);

  const totalCount = React.useMemo(() => {
    return data?.pages?.[0]?.rawResponse?.pagination?.total || 0;
  }, [data?.pages]);

  const handleRetry = React.useCallback(() => {
    refetch();
  }, [refetch]);

  // Clear search handler
  const handleClearSearch = React.useCallback(() => {
    setLocalSearchQuery("");
    setLQ(""); // Also clear the store immediately
  }, [setLQ]);

  // Handle search input change
  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    []
  );

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
    <section className="min-h-screen bg-gradient-to-br">
      <MaxWidthContainer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}
          />

          <div className="relative z-10 px-4 py-16 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
                Discover Amazing
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Stories
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-blue-100">
                Explore curated content from the world&apos;s most creative
                minds and stay ahead of the curve.
              </p>
            </motion.div>
          </div>
        </div>
      </MaxWidthContainer>
      {/* Enhanced Header */}
      <MaxWidthContainer className="dark:!bg-gray-90 sticky top-0 z-50 border-b border-gray-200/50 !py-6 backdrop-blur-xl dark:border-gray-700">
        <div className="container mx-auto">
          {/* Main Search and Controls */}
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Enhanced Search Bar */}
            <div className="group relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 -mt-2 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
              </div>
              <Input
                placeholder="Discover amazing content..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="h-12 rounded-xl border-2 border-gray-200 bg-white/50 pr-4 pl-12 text-lg shadow-none backdrop-blur-sm outline-none focus:border-blue-500"
              />
              {localSearchQuery && (
                <Button
                  variant={"link"}
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 mt-2 mr-4 flex items-center !p-0 pr-4 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Controls */}
            <div className="mb-2 flex items-center gap-3">
              {/* Sort Dropdown */}
              <Select value={filters.sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="!h-12 w-44 cursor-pointer rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
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
                        className="cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <div className="flex flex-col items-start">
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
                  className={`!h-12 w-12 cursor-pointer rounded-none px-4 ${
                    filters.viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={filters.viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`!h-12 w-12 cursor-pointer rounded-none px-4 ${
                    filters.viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Button (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="relative h-12 rounded-xl border-2 border-gray-200 bg-white/50 px-4 backdrop-blur-sm lg:hidden"
                aria-label={`${showMobileFilters ? "Hide" : "Show"} filters`}
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
          <AnimatePresence>
            {(showMobileFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <FilterPills />
              </motion.div>
            )}
          </AnimatePresence>

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
                    className="h-6 cursor-pointer px-2 text-gray-500 hover:text-gray-700"
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
      </MaxWidthContainer>

      {/* Main Content */}
      <MaxWidthContainer className="py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  : "grid grid-cols-1 gap-6 space-y-6 md:grid-cols-2"
              }
            >
              {allItems.map((item, index) => {
                const dataItem = item as FeedItem;

                return (
                  <motion.div
                    key={`${dataItem.id}-${index}`} // More stable key
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    className="group block"
                  >
                    <FeedItemCard item={dataItem} view={viewMode} />
                  </motion.div>
                );
              })}
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
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed right-4 bottom-4 z-50 rounded-full bg-blue-500 p-2 text-white shadow-lg transition-colors hover:bg-blue-600 sm:right-8 sm:bottom-8 sm:p-3"
            >
              <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </MaxWidthContainer>
    </section>
  );
};
