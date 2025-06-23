"use client";
import { ArrowRight, Eye, Heart, Play, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { mockAuthors } from "@/config/constants/mockdata";
import { allRoutes } from "@/config/constants/routes";
import { formatDate } from "@/lib/utils";
import { Category, FeedItem } from "@/types";

import { FeedItemCard } from "../cards/feed-item-card";
import GlobalSearchInput from "../forms/search/global-search-input";
import MaxWidthContainer from "../layout/max-width-container";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Input } from "../ui/input";
type Props = {
  allFeeds: FeedItem[];
  allCategories: Category[];
};
export const MainPage = (props: Props) => {
  const clientFeedItems = props.allFeeds;
  return (
    <>
      <MaxWidthContainer className="relative">
        <section className="overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Discover Amazing Content
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 md:text-2xl dark:text-gray-300">
                Your personal feed explorer for the best articles, insights, and
                stories from around the web
              </p>

              {/* Search Bar */}
              <div className="mx-auto mb-8 max-w-2xl">
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
              {clientFeedItems[0] && (
                <div
                  className={`'dark:bg-gray-800' bg-white'} relative overflow-hidden rounded-2xl shadow-xl`}
                >
                  <div className="relative h-[200px] w-full">
                    <Image
                      fill
                      src={
                        clientFeedItems[0].thumbnail ||
                        "https://res.cloudinary.com/davidleo/image/upload/v1710934057/cruiseair/g-1165680144-budapest-hungary-danube-river_jwwxqh.jpg"
                      }
                      alt={clientFeedItems[0].title}
                      className="h-80 w-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                      Featured
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="mb-4 flex items-center justify-between space-x-4">
                      <span className="relative rounded-md bg-purple-200 px-2 py-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                        <Link
                          className="absolute top-0 left-0 z-50 size-full"
                          href={`${allRoutes.feeds.url}?category=${props.allCategories.find((cat) => cat.name.toLowerCase() === clientFeedItems[0].category.toLowerCase())?.id}`}
                        />

                        {clientFeedItems[0].category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {clientFeedItems[0].readTime} min read
                      </span>
                    </div>
                    <Link
                      href={`${allRoutes.feeds.url}/${clientFeedItems[0].id}`}
                      className="mb-3 cursor-pointer text-2xl font-bold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {clientFeedItems[0].title}
                    </Link>
                    <p className="mb-6 line-clamp-2 text-gray-600 dark:text-gray-400">
                      {clientFeedItems[0].description.length > 120
                        ? clientFeedItems[0].description.slice(0, 120) + "..."
                        : clientFeedItems[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                          {clientFeedItems[0].author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">
                            {clientFeedItems[0].author.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(clientFeedItems[0].publishedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">
                            {clientFeedItems[0].views}
                          </span>
                        </div>
                        <button className="transition-colors hover:text-red-500">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="transition-colors hover:text-blue-500">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {clientFeedItems.length > 0 &&
                  clientFeedItems
                    .filter((item) => item.featured === false)
                    .slice(0, 2)
                    .map((item) => (
                      <div className="grid grid-cols-12 gap-4" key={item.id}>
                        <div className="col-span-12 rounded-md border border-blue-300 bg-blue-50 p-3 md:col-span-8 md:border-none md:bg-transparent">
                          <div className="py-8">
                            <div className="mb-4 flex items-center justify-between space-x-4">
                              <div className="space-x-2">
                                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                                  Featured
                                </span>
                                <span className="relative rounded-md bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                                  <Link
                                    className="absolute top-0 left-0 z-50 size-full"
                                    href={`${allRoutes.feeds.url}?category=${props.allCategories.find((cat) => cat.name.toLowerCase() === item.category.toLowerCase())?.id}`}
                                  />
                                  {item.category}
                                </span>
                              </div>
                              <span className="text-sm text-gray-400">
                                {item.readTime} min read
                              </span>
                            </div>
                            <Link
                              href={`${allRoutes.feeds.url}/${item.id}`}
                              className="mb-3 cursor-pointer text-2xl font-bold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {item.title}
                            </Link>
                            <p className="mb-6 line-clamp-2 text-gray-600 dark:text-gray-400">
                              {item.description.length > 120
                                ? item.description.slice(0, 120) + "..."
                                : item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                                  {item.author.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {item.author.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {formatDate(item.publishedAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span className="text-sm">{item.views}</span>
                                </div>
                                <button className="transition-colors hover:text-red-500">
                                  <Heart className="h-4 w-4" />
                                </button>
                                <button className="transition-colors hover:text-blue-500">
                                  <Share2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative col-span-12 size-full md:col-span-4">
                          <Image
                            fill
                            src={
                              item.thumbnail ||
                              "https://res.cloudinary.com/davidleo/image/upload/v1710934057/cruiseair/g-1165680144-budapest-hungary-danube-river_jwwxqh.jpg"
                            }
                            alt={item.title}
                            className="h-[20px] w-full rounded-md object-cover md:h-80"
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Side Featured Posts */}
            <div className="flex flex-col justify-between space-y-6">
              {clientFeedItems.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className={`"dark:bg-gray-800" "bg-white"} overflow-hidden rounded-xl shadow-lg`}
                >
                  {/* <div className="relative h-[120px] w-full">
                    <Image
                      fill
                      src={
                        post.thumbnail ||
                        "https://res.cloudinary.com/davidleo/image/upload/v1710934057/cruiseair/g-1165680144-budapest-hungary-danube-river_jwwxqh.jpg"
                      }
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  </div> */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between space-x-2">
                      <span className="relative rounded-md bg-blue-200 px-4 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                        <Link
                          className="absolute top-0 left-0 z-50 size-full"
                          href={`${allRoutes.feeds.url}?category=${props.allCategories.find((cat) => cat.name.toLowerCase() === post.category.toLowerCase())?.id}`}
                        />

                        {post.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {post.readTime} min read
                      </span>
                    </div>
                    <Link
                      href={`${allRoutes.feeds.url}/${post.id}`}
                      className="mb-2 line-clamp-2 cursor-pointer font-bold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {post.title}
                    </Link>
                    <p className="mb-6 line-clamp-2 text-gray-600 dark:text-gray-400">
                      {clientFeedItems[0].description.length > 120
                        ? clientFeedItems[0].description.slice(0, 120) + "..."
                        : clientFeedItems[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="h-3 w-3" />
                        <span className="text-xs">{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer className={`bg-gray-50 py-16 dark:bg-gray-800`}>
        <section>
          <div className="mb-12 text-left">
            <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore content by your favorite topics
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {props.allCategories
              .filter(
                (category) =>
                  props.allFeeds.filter(
                    (item) =>
                      item.category.toLowerCase() ===
                      category.name.toLowerCase()
                  ).length > 0
              )
              .map((category) => {
                const categoryGradients: Record<string, string> = {
                  Technology: "from-blue-400 to-purple-500",
                  Science: "from-green-400 to-blue-500",
                  Health: "from-pink-400 to-red-500",
                  Business: "from-yellow-400 to-orange-500",
                  Travel: "from-teal-400 to-cyan-500",
                  // Add more as needed, fallback below
                };
                const getGradient = (name: string) =>
                  categoryGradients[name] || "from-gray-400 to-gray-600";
                const articlesCount = props.allFeeds.filter(
                  (item) =>
                    item.category.toLowerCase() === category.name.toLowerCase()
                ).length;
                return (
                  <div
                    key={category.id}
                    className={`transform cursor-pointer rounded-xl ${getGradient(
                      category.name
                    )} bg-gradient-to-br p-6 transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-700`}
                  >
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white`}
                    >
                      <div
                        className={`h-6 w-6 rounded-sm bg-white ${getGradient(
                          category.name
                        )} bg-gradient-to-br`}
                      ></div>
                    </div>
                    <h3 className="mb-2 font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {articlesCount} articles
                    </p>
                  </div>
                );
              })}
          </div>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer className={`bg-gray-50"} py-16 dark:bg-gray-800`}>
        {/* Authors Section */}
        <section>
          <div className="mb-12 text-left">
            <h2 className="mb-4 text-3xl font-bold">Featured Authors</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Follow your favorite writers and discover new voices
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {mockAuthors.map((author, index) => (
              <div
                key={index}
                className={`rounded-xl bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-900`}
              >
                <Image
                  src={
                    author.avatar ||
                    "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png"
                  }
                  width={80}
                  height={80}
                  alt={author.name}
                  className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                />
                <h3 className="mb-1 font-bold">{author.name}</h3>
                <p className="mb-4 text-sm text-gray-500">{author.role}</p>
                <div className="mb-6 flex justify-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold">
                      {
                        props.allFeeds.filter(
                          (item) => item.author.id === author.id
                        ).length
                      }
                    </p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{10}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                </div>
                <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <section>
          <Carousel>
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold">Trending Articles</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover what&apos;s popular right now
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <CarouselContent className="-ml-1">
              {props.allFeeds
                .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
                .map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-3 md:basis-1/2 lg:basis-1/3"
                  >
                    <FeedItemCard item={item} view="grid" />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </section>
      </MaxWidthContainer>
      <MaxWidthContainer className="h-full bg-gradient-to-r from-blue-600 to-purple-600 py-20 md:h-[300px]">
        {/* Subscribe Section */}
        <section className="">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Never Miss a Story
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Get the best content delivered straight to your inbox every week
            </p>

            <div className="mx-auto max-w-md">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg bg-white px-6 py-3 text-gray-900 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
                <Button className="rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition-colors hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-blue-100">
                Join 50,000+ readers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </MaxWidthContainer>
    </>
  );
};
