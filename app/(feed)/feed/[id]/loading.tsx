"use client";

import { ChevronLeft, Bookmark, Share2 } from "lucide-react";

import MaxWidthContainer from "@/components/layout/max-width-container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar Skeleton */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-gray-200" />

      {/* Navigation Header */}
      <MaxWidthContainer className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 !py-0 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between">
          <Button
            variant={"outline"}
            className="flex items-center gap-2 text-gray-400"
            disabled
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Feed</span>
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant={"outline"}
              className="rounded-full p-2 text-gray-400"
              disabled
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full p-2 text-gray-400"
              disabled
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Hero Section Skeleton */}
      <MaxWidthContainer className="relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200">
        <div className="relative z-10 py-16">
          <div className="text-white">
            {/* Category Badge Skeleton */}
            <div className="mb-6">
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            {/* Title Skeleton */}
            <div className="mb-6 space-y-3">
              <Skeleton className="h-12 w-full max-w-4xl" />
              <Skeleton className="h-12 w-3/4 max-w-3xl" />
            </div>

            {/* Description Skeleton */}
            <div className="mb-8 space-y-2">
              <Skeleton className="h-6 w-full max-w-3xl" />
              <Skeleton className="h-6 w-2/3 max-w-2xl" />
            </div>

            {/* Author and Meta Info Skeleton */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Main Content */}
      <MaxWidthContainer>
        <div className="px-4 py-12">
          <div className="flex gap-12">
            {/* Article Content Skeleton */}
            <article className="flex-1">
              <div className="space-y-6">
                {/* Content paragraphs */}
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>

                {/* Subheading */}
                <Skeleton className="h-8 w-2/3" />

                {/* More content */}
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Section Skeleton */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <Skeleton className="mb-4 h-6 w-16" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Author Bio Skeleton */}
              <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8">
                <Skeleton className="mb-4 h-6 w-40" />
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="mt-3 h-9 w-32 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Comments Section Skeleton */}
              <div className="mt-16">
                <Skeleton className="mb-8 h-8 w-48" />

                {/* Add Comment Form Skeleton */}
                <div className="mb-8 rounded-lg border border-gray-200 p-6">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <div className="mt-4 flex items-center justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-9 w-32 rounded-full" />
                  </div>
                </div>

                {/* Comments List Skeleton */}
                <div className="space-y-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
                      <div className="flex-1">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar Skeleton */}
            <aside className="w-80 space-y-8">
              {/* Floating Action Buttons Skeleton */}
              <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              </div>

              {/* Related Articles Skeleton */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <Skeleton className="mb-6 h-6 w-36" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
