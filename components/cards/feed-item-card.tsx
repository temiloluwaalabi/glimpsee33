"use client";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bookmark, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import { feedService } from "@/lib/api/api";
import { log } from "@/lib/logger";
import { formatDate } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { FeedItem } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
  item: FeedItem;
  view: "grid" | "list";
};
export const FeedItemCard = ({ item, view }: Props) => {
  const queryClient = useQueryClient();
  const {
    addBookmark,
    addFavorite,
    isBookmarked,
    isFavorited,
    removeBookmark,
    removeFavorite,
  } = useAppStore();

  const isBookmared = isBookmarked(item.id);
  const isLikeds = isFavorited(item.id);
  const [isLiked, setIsLiked] = useState<boolean>(isLikeds || false);
  const [isSaved, setIsSaved] = useState<boolean>(isBookmared || false);
  const [likesCount, setLikesCount] = useState(item.likes);

  console.log("ISAVED", isLiked);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      type LikeFeedItemResponse = { isLiked: boolean; likes: number };
      const result = await feedService.likeFeedItem(item.id);

      const resultData = result.data as LikeFeedItemResponse;

      if (isLiked === true) {
        setIsLiked(false); // Also set this to false when unbookmarked
        removeFavorite(item.id);
        queryClient.invalidateQueries({
          queryKey: ["favorited-feeds"],
        });
        toast.success("Article removed from Favorite");
        // Invalidate favorited-feeds query cache if using react-query
      } else {
        if (resultData.isLiked) {
          setIsLiked(true);
          addFavorite(item.id);
          setLikesCount(resultData.likes);
          toast.success("Article Liked");
        }
      }
    } catch (error) {
      log.error("Failed to toggle like", error);
      toast.error("Failed to update favorite status");
    }
  };
  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Fixed the typo: isBookmared -> isBookmarked
      type BookmarkFeedItemResponse = { isBookmarked: boolean };

      const result = await feedService.bookmarkFeedItem(item.id);

      // Access the correct property based on your API response structure
      const resultData = result.data as BookmarkFeedItemResponse;
      console.log("RESULT DATA", resultData.isBookmarked);

      if (isSaved === true) {
        setIsSaved(false); // Also set this to false when unbookmarked
        removeBookmark(item.id);
        queryClient.invalidateQueries({
          queryKey: ["bookmarked-feeds"],
        });
        toast.success("Article removed from bookmark");
      } else {
        if (resultData.isBookmarked) {
          setIsSaved(true);
          addBookmark(item.id);
          toast.success("Article Saved");
        }
      }
    } catch (error) {
      log.error("Failed to toggle save", error);
      toast.error("Failed to bookmark article");
    }
  };

  if (view === "list") {
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group cursor-pointer overflow-hidden !p-0 transition-all duration-300 hover:shadow-lg">
        <div className="flex">
          <div className="relative h-32 w-48 flex-shrink-0">
            <Image
              fill
              src={
                item.thumbnail ||
                "https://res.cloudinary.com/davidleo/image/upload/v1710934057/cruiseair/g-1165680144-budapest-hungary-danube-river_jwwxqh.jpg"
              }
              quality={100}
              alt={item.title}
              className="h-full w-full rounded-t-md object-top transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-2 left-2 bg-black/70">
              {item.category}
            </Badge>
          </div>
          <CardContent className="flex-1 p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="group-hover:text-primary line-clamp-1 text-base font-semibold transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-xs">
              {item.description.length > 70
                ? item.description.slice(0, 70) + "..."
                : item.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={item.author.avatar}
                    alt={item.author.name}
                  />
                  <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-sm">
                  {item.author.name}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(item.publishedAt)}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">
                  {item.readTime} min read
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`h-8 px-2 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
                >
                  <Heart
                    className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  {likesCount}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={`h-8 px-2 ${isSaved ? "text-blue-500 hover:text-blue-600" : ""}`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group h-full cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:shadow-xl">
        <div className="relative">
          <Image
            height={48}
            width={100}
            src={item.thumbnail}
            alt={item.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-black/70 dark:bg-white">
              {item.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBookmark}
              className={`h-8 w-8 cursor-pointer bg-black/70 p-0 hover:bg-black/80 ${isSaved ? "text-blue-400" : "text-white"}`}
            >
              <Bookmark
                className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.author.avatar} alt={item.author.name} />
              <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-sm">
              {item.author.name}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-muted-foreground text-xs">
              {formatDate(item.publishedAt)}
            </span>
          </div>
          <Link
            href={`/feed/${item.id}`}
            className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-semibold transition-colors"
          >
            {item.title}
          </Link>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {item.description.length > 70
              ? item.description.slice(0, 70) + "..."
              : item.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {item.readTime} min
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {Math.floor(Math.random() * 1000) + 100}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`h-8 cursor-pointer px-2 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
              >
                <Heart
                  className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                {likesCount}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
