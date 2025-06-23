"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import MaxWidthContainer from "@/components/layout/max-width-container";
import { allRoutes } from "@/config/constants/routes";
import { Category, FeedItem } from "@/types";

type Props = {
  categories: Category[];
  feedItems: FeedItem[];
};
export const CategoryArchive = ({ categories, feedItems }: Props) => {
  return (
    <div>
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
      <MaxWidthContainer className={`bg-gray-50 py-16 dark:bg-gray-800`}>
        <section>
          <div className="mb-12 text-left">
            <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore content by your favorite topics
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {categories
              .filter(
                (category) =>
                  feedItems.filter(
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
                const articlesCount = feedItems.filter(
                  (item) =>
                    item.category.toLowerCase() === category.name.toLowerCase()
                ).length;
                return (
                  <div
                    key={category.id}
                    className={`relative transform cursor-pointer rounded-xl ${getGradient(
                      category.name
                    )} bg-gradient-to-br p-6 transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-700`}
                  >
                    <Link
                      className="absolute top-0 left-0 z-50 size-full"
                      href={`${allRoutes.feeds.url}?category=${category.id}`}
                    />
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
    </div>
  );
};
