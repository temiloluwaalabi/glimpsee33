"use client";

import { Filter, Grid, List, Search, TrendingUp } from "lucide-react";

import MaxWidthContainer from "@/components/layout/max-width-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Loading Skeleton Component for Feed Items
const FeedItemSkeleton = ({ view = "grid" }: { view: "grid" | "list" }) => {
  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <Skeleton className="h-32 w-48 flex-shrink-0" />
          <CardContent className="flex-1 p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-3 h-4 w-5/6" />
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
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-3/4" />
        <div className="mb-4 flex gap-1">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="mb-3 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FeedsPageSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section Skeleton */}
      <MaxWidthContainer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}
          />

          <div className="relative z-10 px-4 py-16 text-center text-white">
            <div className="space-y-4">
              <div className="mx-auto flex justify-center space-x-2">
                <Skeleton className="h-12 w-48 md:h-16 md:w-64" />
                <Skeleton className="h-12 w-32 md:h-16 md:w-48" />
              </div>
              <div className="mx-auto flex justify-center space-x-2">
                <Skeleton className="h-6 w-96 max-w-2xl" />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Enhanced Header Skeleton */}
      <MaxWidthContainer className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 !py-6 backdrop-blur-xl">
        <div className="container mx-auto">
          {/* Main Search and Controls */}
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Enhanced Search Bar Skeleton */}
            <div className="group relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Discover amazing content..."
                disabled
                className="h-12 rounded-xl border-2 border-gray-200 bg-white/50 pr-4 pl-12 text-lg shadow-none backdrop-blur-sm"
              />
            </div>

            {/* Controls Skeleton */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown Skeleton */}
              <div className="flex h-12 w-44 cursor-not-allowed items-center gap-2 rounded-xl border-2 border-gray-200 bg-white/50 px-3 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* View Toggle Skeleton */}
              <div className="flex overflow-hidden rounded-xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                <Button
                  variant="default"
                  size="sm"
                  disabled
                  className="!h-12 w-12 cursor-not-allowed rounded-none bg-gradient-to-r from-blue-500 to-purple-500 px-4 text-white"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="!h-12 w-12 cursor-not-allowed rounded-none px-4 hover:bg-gray-100"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Button Skeleton (Mobile) */}
              <Button
                variant="outline"
                disabled
                className="relative h-12 rounded-xl border-2 border-gray-200 bg-white/50 px-4 backdrop-blur-sm lg:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Pills Skeleton */}
          <div className="mt-4 hidden lg:block">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-8 w-20 rounded-full"
                  style={{ width: `${60 + Math.random() * 40}px` }}
                />
              ))}
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </MaxWidthContainer>

      {/* Main Content Skeleton */}
      <MaxWidthContainer className="py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <FeedItemSkeleton key={i} view="grid" />
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <span className="font-medium text-gray-600">
              Loading amazing content...
            </span>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
