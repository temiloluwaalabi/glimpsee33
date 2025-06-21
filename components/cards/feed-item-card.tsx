"use client";
import { motion } from "framer-motion";
import { Bookmark, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

import { feedService } from "@/lib/api/api";
import { log } from "@/lib/logger";
import { formatDate } from "@/lib/utils";
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
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isSaved, setIsSaved] = useState(item.isBookmarked);
  const [likesCount, setLikesCount] = useState(item.likes);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      type LikeFeedItemResponse = { isLiked: boolean; likes: number };
      const result = await feedService.likeFeedItem(item.id);

      const resultData = result.data as LikeFeedItemResponse;
      if (resultData) {
        setIsLiked(resultData.isLiked);
        setLikesCount(resultData.likes);
      }
      toast.success(
        result.success ? "Added to favourites" : "Removed from favourites"
      );
    } catch (error) {
      log.error("Failed to toggle like", error);
      toast.error("Failed to update favorite status");
    }
  };
  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      type LikeFeedItemResponse = { isBookmared: boolean };
      const result = await feedService.bookmarkFeedItem(item.id);

      const resultData = result.data as LikeFeedItemResponse;
      if (resultData) {
        setIsSaved(resultData.isBookmared);
      }
      toast.success(
        result.success ? "Article Saved" : "Article removed from bookmark"
      );
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
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="flex">
          <div className="relative h-32 w-48 flex-shrink-0">
            <Image
              width={48}
              height={32}
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge className="absolute top-2 left-2 bg-black/70">
              {item.category}
            </Badge>
          </div>
          <CardContent className="flex-1 p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
              {item.description}
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
      <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative">
          <Image
            height={48}
            width={100}
            src={item.thumbnail}
            alt={item.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-black/70">
              {item.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBookmark}
              className={`h-8 w-8 bg-black/70 p-0 hover:bg-black/80 ${isSaved ? "text-blue-400" : "text-white"}`}
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
          <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
            {item.description}
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
                className={`h-8 px-2 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
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
