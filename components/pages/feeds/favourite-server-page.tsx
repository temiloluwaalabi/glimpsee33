"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import * as React from "react";

import { FeedItemCard } from "@/components/cards/feed-item-card";
import MaxWidthContainer from "@/components/layout/max-width-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFavoritedFeeds } from "@/hooks/use-feed";
import { FeedItem } from "@/types";

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

export const FavouriteArchivePage = () => {
  const {
    data: Bookmarkedfeeds,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFavoritedFeeds(true);

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
          <Button onClick={() => refetch()}>Try Again</Button>
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
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
                Your
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Favourite{" "}
                </span>
                Feeds
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-blue-100">
                All your saved articles in one place. Revisit your favorite
                stories and keep track of what matters most to you.
              </p>
            </motion.div>
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
              className={"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <FeedItemSkeleton key={i} view={"grid"} />
              ))}
            </motion.div>
          ) : Bookmarkedfeeds?.length === 0 ? (
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
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}
            >
              {Bookmarkedfeeds?.map((item, index) => {
                const dataItem = item as FeedItem;

                return (
                  <motion.a
                    key={`${dataItem.id}-${index}`} // More stable key
                    href={`/feed/${dataItem.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.3) }}
                    className="group block"
                  >
                    <FeedItemCard item={dataItem} view={"grid"} />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWidthContainer>
    </section>
  );
};
