"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Bookmark,
  Share2,
  Eye,
  Clock,
  MessageCircle,
  ChevronLeft,
  Twitter,
  Facebook,
  Link2,
  Calendar,
  Tag,
  ThumbsUp,
  Send,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import MaxWidthContainer from "@/components/layout/max-width-container";
import { Button } from "@/components/ui/button";
import { allRoutes } from "@/config/constants/routes";
import { FeedItem } from "@/types";

// Mock data based on your FeedItem interface

const mockComments = [
  {
    id: "1",
    author: "Alex Thompson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    content:
      "This is exactly what I've been thinking about lately. The collaboration aspect is key - AI as a creative partner rather than a replacement.",
    timestamp: "2 hours ago",
    likes: 12,
  },
  {
    id: "2",
    author: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    content:
      "Great insights! I've been using AI tools in my workflow and the productivity gains are incredible. The key is knowing when to let AI help and when to trust your human instincts.",
    timestamp: "4 hours ago",
    likes: 8,
  },
];

type Props = {
  feedItem: FeedItem;
  allFeeds: FeedItem[];
};
export default function FeedDetailsPage({ feedItem, allFeeds }: Props) {
  const [isLiked, setIsLiked] = React.useState(feedItem.isLiked);
  const [isBookmarked, setIsBookmarked] = React.useState(feedItem.isBookmarked);
  const [likeCount, setLikeCount] = React.useState(feedItem.likes);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [readingProgress, setReadingProgress] = React.useState(0);
  const [newComment, setNewComment] = React.useState("");

  const relatedArticles = allFeeds.filter(
    (article) =>
      article.category.toLowerCase() === feedItem.category.toLowerCase()
  );

  // Handle scroll for reading progress and scroll-to-top Button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setReadingProgress(Math.min(progress, 100));
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ShareMenu = () => (
    <AnimatePresence>
      {showShareMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="absolute top-12 right-0 z-50 rounded-lg border border-gray-200 bg-white p-3 shadow-xl"
        >
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-left hover:bg-gray-50">
              <Twitter className="h-5 w-5 text-blue-400" />
              <span className="text-sm sm:text-base">Share on Twitter</span>
            </button>
            <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-left hover:bg-gray-50">
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="text-sm sm:text-base">Share on Facebook</span>
            </button>
            <button className="flex items-center gap-3 rounded-lg px-4 py-2 text-left hover:bg-gray-50">
              <Link2 className="h-5 w-5 text-gray-600" />
              <span className="text-sm sm:text-base">Copy link</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Navigation Header */}
      <MaxWidthContainer className="dark:bg-dark-400 sticky top-0 z-40 border-b border-gray-200 bg-white/80 !py-0 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 sm:h-16">
          <Button
            variant={"outline"}
            className="relative flex cursor-pointer items-center gap-1 text-sm text-gray-600 transition-colors hover:text-gray-900 sm:gap-2 sm:text-base dark:bg-white dark:hover:bg-blue-600 dark:hover:text-white"
          >
            <Link
              className="absolute top-0 left-0 z-20 size-full"
              href={allRoutes.feeds.url}
            />
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Back to Feed</span>
            <span className="sm:hidden">Back</span>
          </Button>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant={"outline"}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`rounded-full p-2 transition-colors dark:bg-white dark:hover:bg-blue-600 dark:hover:text-white ${
                isBookmarked
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bookmark
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </Button>

            <div className="relative">
              <Button
                variant={"outline"}
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:bg-white dark:hover:bg-blue-600 dark:hover:text-white"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <ShareMenu />
            </div>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Hero Section */}
      <MaxWidthContainer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div>
          <Image
            fill
            src={feedItem.thumbnail}
            alt={feedItem.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Category Badge */}
              <div className="mb-4 sm:mb-6">
                <span className="rounded-full border border-blue-300/30 bg-blue-500/20 px-3 py-1 text-xs font-medium backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                  {feedItem.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {feedItem.title}
              </h1>

              {/* Description */}
              <p className="mb-6 max-w-3xl text-base text-blue-100 sm:mb-8 sm:text-lg md:text-xl lg:text-2xl">
                {feedItem.description}
              </p>

              {/* Author and Meta Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Image
                    width={40}
                    height={40}
                    src={feedItem.author.avatar}
                    alt={feedItem.author.name}
                    className="h-10 w-10 rounded-full border-2 border-white/30 sm:h-12 sm:w-12"
                  />
                  <div>
                    <p className="text-sm font-semibold sm:text-base">
                      {feedItem.author.name}
                    </p>
                    <p className="text-xs text-blue-200 sm:text-sm">Author</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-blue-200 sm:flex sm:items-center sm:gap-6 sm:text-sm">
                  <span className="flex items-center gap-1 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">
                      {formatDate(feedItem.publishedAt)}
                    </span>
                    <span className="sm:hidden">
                      {new Date(feedItem.publishedAt).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    {feedItem.readTime} min read
                  </span>
                  <span className="col-span-2 flex items-center gap-1 sm:col-span-1 sm:gap-2">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    {feedItem.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Main Content */}
      <MaxWidthContainer>
        <div className="px-4 py-8 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Article Content */}
            <article className="order-2 flex-1 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-sm sm:prose-base lg:prose-lg prose-gray max-w-none space-y-4 [&_h2]:text-lg [&_h2]:font-bold"
                dangerouslySetInnerHTML={{ __html: feedItem.content }}
              />

              {/* Tags */}
              <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8">
                <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg dark:text-gray-100">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {feedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 sm:px-3 sm:text-sm"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:mt-12 sm:p-6 lg:p-8">
                <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                  About the Author
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Image
                    width={56}
                    height={56}
                    src={feedItem.author.avatar}
                    alt={feedItem.author.name}
                    className="h-14 w-14 self-start rounded-full sm:h-16 sm:w-16"
                  />
                  <div className="flex-1">
                    <h4 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                      {feedItem.author.name}
                    </h4>
                    <p className="mb-3 text-sm text-gray-600 sm:text-base">
                      {feedItem.author.bio}
                    </p>
                    <Button className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-sm">
                      Follow Author
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-12 sm:mt-16">
                <h3 className="mb-6 text-xl font-bold text-gray-900 sm:mb-8 sm:text-2xl dark:text-gray-200">
                  Comments ({feedItem.comments})
                </h3>

                {/* Add Comment Form */}
                <div className="mb-6 rounded-lg border border-gray-200 p-4 sm:mb-8 sm:p-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:p-4 sm:text-base"
                    rows={3}
                  />
                  <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:mt-4 sm:flex-row sm:items-center">
                    <span className="text-xs text-gray-500 sm:text-sm">
                      Be respectful and constructive
                    </span>
                    <Button className="flex items-center gap-2 self-end rounded-full bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 sm:self-auto sm:px-6">
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                      Post Comment
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4 sm:space-y-6">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 sm:gap-4">
                      <Image
                        height={32}
                        width={32}
                        src={comment.avatar}
                        alt={comment.author}
                        className="h-8 w-8 flex-shrink-0 rounded-full sm:h-10 sm:w-10"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
                          <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                              {comment.author}
                            </h4>
                            <span className="text-xs text-gray-500 sm:text-sm">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-sm break-words text-gray-700 sm:text-base">
                            {comment.content}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 sm:gap-4 sm:text-sm">
                          <Button className="flex h-auto items-center gap-1 p-0 transition-colors hover:text-blue-500">
                            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            {comment.likes}
                          </Button>
                          <Button className="h-auto p-0 transition-colors hover:text-blue-500">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar - Mobile: Top, Desktop: Right */}
            <aside className="order-1 w-full lg:order-2 lg:w-80">
              {/* Mobile Action Bar - Only visible on mobile */}
              <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg lg:hidden">
                <div className="flex items-center justify-around">
                  <Button
                    onClick={handleLike}
                    className={`flex flex-col items-center gap-1 px-3 py-2 transition-all ${
                      isLiked
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                    variant="ghost"
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    <span className="text-xs font-medium">{likeCount}</span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 transition-all hover:text-blue-500"
                    variant="ghost"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs font-medium">
                      {feedItem.comments}
                    </span>
                  </Button>

                  <Button
                    className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 transition-all hover:text-green-500"
                    variant="ghost"
                  >
                    <Eye className="h-5 w-5" />
                    <span className="text-xs font-medium">
                      {feedItem.views > 1000
                        ? `${Math.round(feedItem.views / 1000)}k`
                        : feedItem.views}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Desktop Floating Action Buttons - Hidden on mobile */}
              <div className="sticky top-24 mb-8 hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg lg:block">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleLike}
                    className={`flex items-center justify-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      isLiked
                        ? "border-2 border-red-200 bg-red-50 text-red-500"
                        : "border-2 border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={isLiked ? "currentColor" : "none"}
                    />
                    <span className="font-medium">{likeCount}</span>
                  </Button>

                  <Button className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 transition-all hover:bg-gray-100">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{feedItem.comments}</span>
                  </Button>

                  <Button className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 transition-all hover:bg-gray-100">
                    <Eye className="h-5 w-5" />
                    <span className="font-medium">
                      {feedItem.views.toLocaleString()}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
                  Related Articles
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {relatedArticles.slice(0, 3).map((article) => (
                    <div
                      key={article.id}
                      className="group flex cursor-pointer gap-3"
                    >
                      <Image
                        width={56}
                        height={56}
                        src={article.thumbnail}
                        alt={article.title}
                        className="h-14 w-14 flex-shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 sm:text-base">
                          {article.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
                          <span>{article.readTime} min</span>
                          <span>•</span>
                          <span>
                            {formatDate(article.publishedAt).split(",")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </MaxWidthContainer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed right-4 bottom-4 z-50 rounded-full bg-blue-500 p-2 text-white shadow-lg transition-colors hover:bg-blue-600 sm:right-8 sm:bottom-8 sm:p-3"
          >
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
