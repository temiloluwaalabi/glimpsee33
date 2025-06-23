import React from "react";

import { MainPage } from "@/components/pages/main-page";
import ClientOnly from "@/components/shared/client-only";
import { categoryService, feedService } from "@/lib/api/api";
import { Category, FeedItem } from "@/types";

export default async function Home() {
  const feeds = await feedService.getFeedItems();
  const categories = await categoryService.getCategories();

  const feedData = (feeds.data as FeedItem[]) || [];
  const categoryData = (categories.data as Category[]) || [];
  return (
    <React.Suspense>
      <ClientOnly>
        <MainPage allFeeds={feedData} allCategories={categoryData} />{" "}
      </ClientOnly>
    </React.Suspense>
  );
}
