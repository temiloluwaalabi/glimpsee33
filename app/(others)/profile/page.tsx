import React from "react";

import ProfilePage from "@/components/pages/profile-page";
import { mockCurrentUser } from "@/config/constants/mockdata";
import { feedService } from "@/lib/api/api";
import { FeedItem } from "@/types";

export default async function ProfilePageS() {
  const allfeeds = await feedService.getFeedItems();
  const feeds = (allfeeds.data as FeedItem[]) || [];

  console.log("FEEDS", feeds);
  return <ProfilePage user={mockCurrentUser} allFeeds={feeds} />;
}
