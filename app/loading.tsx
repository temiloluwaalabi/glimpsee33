"use client";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

import GlobalSearchInput from "@/components/forms/search/global-search-input";
import MaxWidthContainer from "@/components/layout/max-width-container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { allRoutes } from "@/config/constants/routes";

export default function loading() {
  return (
    <>
      <MaxWidthContainer className="relative">
        <section className="overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"></div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                Discover Amazing Content
              </h1>
              <p className="mb-8 max-w-3xl !text-center text-xl text-gray-600 md:text-2xl dark:text-gray-300">
                Your personal feed explorer for the best articles, insights, and
                stories from around the web
              </p>

              {/* Search Bar */}
              <div className="mx-auto mb-8 w-full max-w-2xl">
                <GlobalSearchInput
                  placeholder="Search for articles, topics, or authors..."
                  className="rounded-full bg-white shadow-lg dark:bg-gray-800"
                />
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="relative flex items-center space-x-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                  <span>Start Exploring</span>
                  <ArrowRight className="h-5 w-5" />
                  <Link
                    className="absolute top-0 left-0 z-20 size-full"
                    href={allRoutes.feeds.url}
                  />
                </Button>
                <Button
                  className={`flex items-center space-x-2 rounded-lg bg-gray-100 px-8 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700`}
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <section className="py-16">
          <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Featured Posts</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Handpicked content from our top contributors
              </p>
            </div>
            <Button
              variant={"link"}
              className="relative flex items-center space-x-1 font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              <Link
                className="absolute top-0 left-0 z-50 size-full"
                href={allRoutes.feeds.url}
              />
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Featured Post */}
            <div className="flex flex-col justify-between space-y-4 lg:col-span-2">
              <div
                className={`'dark:bg-gray-800' bg-white'} relative overflow-hidden rounded-2xl shadow-xl`}
              >
                <Skeleton className="relative h-[200px] w-full" />

                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                    Featured
                  </span>
                </div>
                <div className="p-8">
                  <div className="mb-4 flex items-center justify-between space-x-4">
                    <Skeleton className="h-6 w-24 rounded-md" />
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="mb-3 h-8 w-3/4 rounded-md" />
                  <Skeleton className="mb-6 h-5 w-full rounded-md" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="mb-2 h-4 w-24 rounded" />
                        <Skeleton className="h-3 w-16 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <Skeleton className="h-4 w-12 rounded" />
                      <Skeleton className="h-4 w-8 rounded" />
                      <Skeleton className="h-4 w-8 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {Array.from({ length: 6 })
                  .slice(0, 2)
                  .map((_, i) => (
                    <div className="grid grid-cols-12 gap-4" key={i}>
                      <div className="col-span-12 rounded-md border border-blue-300 bg-blue-50 p-3 md:col-span-8 md:border-none md:bg-transparent">
                        <div className="py-8">
                          <div className="mb-4 flex items-center justify-between space-x-4">
                            <div className="flex space-x-2">
                              <Skeleton className="h-6 w-20 rounded-full" />
                              <Skeleton className="h-6 w-24 rounded-md" />
                            </div>
                            <Skeleton className="h-5 w-16 rounded-md" />
                          </div>
                          <Skeleton className="mb-3 h-8 w-3/4 rounded-md" />
                          <Skeleton className="mb-6 h-5 w-full rounded-md" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                <Skeleton className="mb-2 h-4 w-24 rounded" />
                                <Skeleton className="h-3 w-16 rounded" />
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-500">
                              <Skeleton className="h-4 w-12 rounded" />
                              <Skeleton className="h-4 w-8 rounded" />
                              <Skeleton className="h-4 w-8 rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative col-span-12 size-full md:col-span-4">
                        <Skeleton className="h-[20px] w-full rounded-md md:h-80" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Side Featured Posts */}
            <div className="flex flex-col justify-between space-y-6">
              {Array.from({ length: 6 })
                .slice(0, 4)
                .map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
                  >
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between space-x-2">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <Skeleton className="h-4 w-12 rounded" />
                      </div>
                      <Skeleton className="mb-2 h-6 w-3/4 rounded-md" />
                      <Skeleton className="mb-6 h-4 w-full rounded" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="mb-2 h-4 w-20 rounded" />
                            <Skeleton className="h-3 w-16 rounded" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Skeleton className="h-3 w-6 rounded" />
                          <Skeleton className="h-3 w-8 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer className="bg-gray-50 py-16 dark:bg-gray-800">
        <section>
          <div className="mb-12 text-left">
            <Skeleton className="mb-4 h-8 w-64 rounded" />
            <Skeleton className="h-5 w-80 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="transform rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 p-6 transition-all dark:bg-gray-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <Skeleton className="h-6 w-6 rounded-sm" />
                </div>
                <Skeleton className="mb-2 h-5 w-24 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </section>
      </MaxWidthContainer>
    </>
  );
}
