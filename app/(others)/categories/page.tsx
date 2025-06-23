import React from "react";

import { CategoryArchive } from "@/components/pages/feeds/category-archive";
import { categoryService, feedService } from "@/lib/api/api";
import { Category, FeedItem } from "@/types";

export default async function ServerCategoriesPage() {
  const feeds = await feedService.getFeedItems();
  const categories = await categoryService.getCategories();

  const feedData = feeds.data as FeedItem[];
  const categoryData = categories.data as Category[];
  return <CategoryArchive feedItems={feedData} categories={categoryData} />;
}
