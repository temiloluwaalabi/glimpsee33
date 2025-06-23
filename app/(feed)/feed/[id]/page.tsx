import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import FeedDetailsPage from "@/components/pages/feeds/feed-details-page";
import { feedService } from "@/lib/api/api";
import { FeedItem } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  try {
    const feed = await feedService.getFeedItem(id);
    const feedData = feed.data as FeedItem;

    if (!feedData) {
      return {
        title: "Feed Not Found",
        description: "The requested feed could not be found.",
      };
    }

    // Extract relevant data for metadata
    const title = feedData.title || "Feed Details";
    const description =
      feedData.description ||
      feedData.content?.substring(0, 160) ||
      "View detailed information about this feed item.";
    const imageUrl =
      feedData.thumbnail ||
      feedData.thumbnail ||
      "https://res.cloudinary.com/davidleo/image/upload/v1716048880/fba46599-c146-4812-b886-91d81479b40c_g42s1j.png";
    const publishedDate = feedData.publishedAt;
    const author = feedData.author || "Unknown Author";

    return {
      title: `${title} | Your Site Name`,
      description,

      // Open Graph metadata
      openGraph: {
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
        publishedTime: publishedDate,
        authors: [author.name],
        siteName: "Feed Explorer",
      },

      // Twitter Card metadata
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@yourtwitterhandle",
        site: "@yourtwitterhandle",
      },

      // Additional SEO metadata
      keywords: feedData.tags?.join(", ") || "feed, news, articles",
      authors: [{ name: author.name }],
      creator: author.name,
      publisher: "feed explorer",

      // Canonical URL
      alternates: {
        canonical: `https://yoursite.com/feed/${id}`,
      },

      // Robots
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Feed Details | Your Site Name",
      description: "View detailed information about this feed item.",
    };
  }
}

export default async function ServerFeedDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const allFeeds = await feedService.getFeedItems();
  const feed = await feedService.getFeedItem(id);

  const feeds = allFeeds.data as FeedItem[];
  const feedData = feed.data as FeedItem;
  if (!feedData) {
    return notFound();
  }
  return <FeedDetailsPage allFeeds={feeds} feedItem={feedData} />;
}
