// components/skeletons/MainPageSkeleton.tsx
import * as React from "react";

import MaxWidthContainer from "../layout/max-width-container";
import { Skeleton } from "../ui/skeleton";

export const MainPageSkeleton = () => {
  return (
    <>
      {/* Hero Section Skeleton */}
      <MaxWidthContainer className="relative">
        <section className="overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"></div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              {/* Title Skeleton */}
              <Skeleton className="mb-6 h-16 w-3/4 max-w-4xl md:h-20" />

              {/* Subtitle Skeleton */}
              <Skeleton className="mb-4 h-6 w-full max-w-3xl" />
              <Skeleton className="mb-8 h-6 w-2/3 max-w-2xl" />

              {/* Search Bar Skeleton */}
              <Skeleton className="mx-auto mb-8 h-12 w-full max-w-2xl rounded-full" />

              {/* Buttons Skeleton */}
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-36" />
              </div>
            </div>
          </div>
        </section>
      </MaxWidthContainer>

      {/* Featured Posts Section Skeleton */}
      <MaxWidthContainer>
        <section className="py-16">
          <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
            <div className="mb-4 md:mb-0">
              <Skeleton className="mb-2 h-8 w-48" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Featured Post Skeleton */}
            <div className="flex flex-col justify-between space-y-4 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                {/* Image Skeleton */}
                <Skeleton className="h-[200px] w-full" />

                <div className="p-8">
                  {/* Category and Read Time Skeleton */}
                  <div className="mb-4 flex items-center justify-between space-x-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  {/* Title Skeleton */}
                  <Skeleton className="mb-3 h-8 w-full" />
                  <Skeleton className="mb-3 h-8 w-3/4" />

                  {/* Description Skeleton */}
                  <div className="mb-6 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>

                  {/* Author and Stats Skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="mb-1 h-4 w-24" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Featured Posts Skeleton */}
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 rounded-md border border-blue-300 bg-blue-50 p-3 md:col-span-8 md:border-none md:bg-transparent">
                      <div className="py-8">
                        <div className="mb-4 flex items-center justify-between space-x-4">
                          <div className="flex space-x-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="mb-3 h-8 w-full" />
                        <div className="mb-6 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="mb-1 h-4 w-24" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <Skeleton className="h-[120px] w-full md:h-80" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Featured Posts Skeleton */}
            <div className="flex flex-col justify-between space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
                >
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between space-x-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="mb-2 h-6 w-full" />
                    <div className="mb-6 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="mb-1 h-4 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MaxWidthContainer>

      {/* Categories Section Skeleton */}
      <MaxWidthContainer className="bg-gray-50 py-16 dark:bg-gray-800">
        <section>
          <div className="mb-12 text-left">
            <Skeleton className="mb-4 h-8 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900"
              >
                <Skeleton className="mb-4 h-12 w-12" />
                <Skeleton className="mb-2 h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </section>
      </MaxWidthContainer>

      {/* Authors Section Skeleton */}
      <MaxWidthContainer className="bg-gray-50 py-16 dark:bg-gray-800">
        <section>
          <div className="mb-12 text-left">
            <Skeleton className="mb-4 h-8 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 text-center shadow-lg dark:bg-gray-900"
              >
                <Skeleton className="mx-auto mb-4 h-20 w-20 rounded-full" />
                <Skeleton className="mx-auto mb-1 h-6 w-32" />
                <Skeleton className="mx-auto mb-4 h-4 w-24" />
                <div className="mb-6 flex justify-center space-x-6">
                  <div className="text-center">
                    <Skeleton className="mb-1 h-6 w-8" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="mb-1 h-6 w-8" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </section>
      </MaxWidthContainer>

      {/* Trending Articles Section Skeleton */}
      <MaxWidthContainer>
        <section className="py-16">
          <div className="mb-8">
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>

          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-80 flex-shrink-0 rounded-xl bg-white shadow-lg dark:bg-gray-800"
              >
                <Skeleton className="h-48 w-full rounded-t-xl" />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="mb-3 h-6 w-full" />
                  <div className="mb-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="mb-1 h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </MaxWidthContainer>

      {/* Subscribe Section Skeleton */}
      <MaxWidthContainer className="h-full bg-gradient-to-r from-blue-600 to-purple-600 py-20 md:h-[300px]">
        <section>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Skeleton className="mx-auto mb-4 h-12 w-96 bg-white/20" />
            <Skeleton className="mx-auto mb-8 h-6 w-80 bg-white/20" />

            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Skeleton className="h-12 flex-1 bg-white/30" />
                <Skeleton className="h-12 w-32 bg-white/30" />
              </div>
              <Skeleton className="mx-auto mt-4 h-4 w-64 bg-white/20" />
            </div>
          </div>
        </section>
      </MaxWidthContainer>
    </>
  );
};
