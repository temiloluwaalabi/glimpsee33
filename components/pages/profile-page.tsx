"use client";

import { motion } from "framer-motion";
import {
  User2,
  Mail,
  Calendar,
  BookOpen,
  Heart,
  MessageCircle,
  Eye,
  Edit3,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { mockFeedItems } from "@/config/constants/mockdata";
import { useGetBookmarkedFeeds } from "@/hooks/use-feed";
import { FeedItem, User } from "@/types";

import { FeedItemCard } from "../cards/feed-item-card";

type Props = {
  user: User;
  allFeeds: FeedItem[];
};
const ProfilePage = (props: Props) => {
  const { data: Bookmarkedfeeds } = useGetBookmarkedFeeds(true);
  const [activeTab, setActiveTab] = useState("articles");
  const [isEditing, setIsEditing] = useState(false);

  const feedsByUser =
    props.allFeeds?.filter((item) => item.author.id === props.user.id) ||
    mockFeedItems;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    { label: "Articles", value: feedsByUser.length, icon: BookOpen },
    { label: "Followers", value: "1.2K", icon: User2 },
    { label: "Following", value: "342", icon: User2 },
    {
      label: "Likes",
      value: feedsByUser.reduce((acc, item) => acc + (item.likes || 0), 0),
      icon: Heart,
    },
  ];

  const tabs = [
    { id: "articles", label: "Articles", count: feedsByUser.length },
    {
      id: "bookmarks",
      label: "Bookmarks",
      count: Bookmarkedfeeds?.length || 0,
    },
    { id: "drafts", label: "Drafts", count: 3 },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="bg-opacity-20 absolute inset-0 bg-black"></div>
      </div>

      {/* Profile Section */}
      <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4">
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={props.user.avatar}
                alt={props.user.name}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    {props.user.name}
                  </h1>
                  <p className="mb-2 text-lg text-gray-600">{props.user.bio}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {props.user.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(props.user.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 md:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-50">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg bg-gray-50 p-4 text-center"
                  >
                    <stat.icon className="mx-auto mb-2 h-5 w-5 text-gray-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 rounded-lg bg-white shadow-sm">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-3 py-4 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {activeTab === "articles" && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Recent Articles</h2>
              <div className="space-y-6">
                {feedsByUser[0] && (
                  <article className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md">
                    <div className="flex gap-4">
                      <Image
                        src={feedsByUser[0]?.thumbnail}
                        alt={feedsByUser[0]?.title}
                        width={96}
                        height={96}
                        className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
                            {feedsByUser[0]?.title}
                          </h3>
                          {feedsByUser[0]?.featured && (
                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mb-3 line-clamp-2 text-gray-600">
                          {feedsByUser[0]?.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatDate(feedsByUser[0]?.publishedAt)}</span>
                          <span>{feedsByUser[0].readTime} min read</span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {feedsByUser[0]?.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {feedsByUser[0]?.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {feedsByUser[0]?.views}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {feedsByUser[0]?.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">
                Bookmarked Articles
              </h2>
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                }
              >
                {(Bookmarkedfeeds?.length ?? 0) > 0 &&
                  Bookmarkedfeeds?.map((item, index) => {
                    const dataItem = item as FeedItem;

                    return (
                      <motion.a
                        key={`${dataItem.id}-${index}`} // More stable key
                        href={`/feed/${dataItem.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.3) }}
                        className="group block"
                      >
                        <FeedItemCard item={dataItem} view={"grid"} />
                      </motion.a>
                    );
                  })}
              </motion.div>
            </div>
          )}

          {activeTab === "drafts" && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Draft Articles</h2>
              <p className="text-gray-600">
                Your draft articles will appear here.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Account Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Theme Preference
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Default Sort
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                      <option value="trending">Trending</option>
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Default View
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500">
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                    </select>
                  </div>
                </div>
                <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
