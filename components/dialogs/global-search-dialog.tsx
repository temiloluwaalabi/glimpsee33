// components/GlobalSearchDialog.tsx
"use client";
import { Search, FileText, Tag, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalSearch } from "@/hooks/use-global-search";

interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const GlobalSearchDialog: React.FC<GlobalSearchDialogProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [selectedType, setSelectedType] = useState<
    "all" | "feeditem" | "category" | "user"
  >("all");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const {
    data: results,
    isLoading,
    error,
  } = useGlobalSearch({
    search: debouncedQuery,
    type: "all",
    category: "feeditem",
  });

  //   const searchResult = results as GlobalSearchResult

  const searchFilters = [
    { key: "all", label: "All", icon: Search },
    { key: "feeditem", label: "Articles", icon: FileText },
    { key: "category", label: "Categories", icon: Tag },
    { key: "user", label: "Users", icon: User },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      data-testid="global-search-dialog"
    >
      <div className="flex min-h-screen items-start justify-center p-4 pt-[10vh] md:items-center md:pt-[10vh]">
        <div
          ref={searchRef}
          className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl dark:bg-gray-900"
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close"
            data-testid="close-dialog"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Search Input */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, categories, or users..."
                className="h-12 pr-4 pl-10 text-lg"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {searchFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.key}
                    variant={
                      selectedType === filter.key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setSelectedType(
                        filter.key as "all" | "feeditem" | "category" | "user"
                      )
                    }
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-4">
            {isLoading && debouncedQuery && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Searching...
                </span>
              </div>
            )}

            {error && (
              <div className="py-8 text-center">
                <p className="text-red-500">
                  An error occurred while searching. Please try again.
                </p>
              </div>
            )}

            {!isLoading && !error && debouncedQuery && results && (
              <div className="space-y-6">
                {results.totalResults === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      No results found for {debouncedQuery}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Feed Items */}
                    {results.feedItems.length > 0 &&
                      (selectedType === "all" ||
                        selectedType === "feeditem") && (
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <FileText className="h-4 w-4" />
                            Articles ({results.feedItems.length})
                          </h3>
                          <div className="space-y-2">
                            {results.feedItems.map((item) => (
                              <Link
                                key={item.id}
                                href={`/feed/${item.id}`}
                                onClick={onClose}
                                className="block rounded-md border p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <div className="flex items-start gap-3">
                                  <Image
                                    width={48}
                                    height={48}
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-12 w-12 rounded object-cover"
                                  />
                                  <div className="flex min-w-0 flex-1 flex-col items-start">
                                    <p className="line-clamp-1 font-medium text-gray-900 dark:text-white">
                                      {item.title}
                                    </p>
                                    <p className="line-clamp-2 text-left text-sm text-gray-600 dark:text-gray-400">
                                      {item.description}
                                    </p>
                                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                      <span>{item.author.name}</span>
                                      <span>•</span>
                                      <span>{item.readTime} min read</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Categories */}
                    {results.categories.length > 0 &&
                      (selectedType === "all" ||
                        selectedType === "category") && (
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <Tag className="h-4 w-4" />
                            Categories ({results.categories.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {results.categories.map((category) => (
                              <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                onClick={onClose}
                                className="block w-fit rounded-md border p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white"
                                    style={{ backgroundColor: category.color }}
                                  >
                                    {category.icon}
                                  </div>
                                  <div className="flex flex-1 flex-col items-start">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {category.name}
                                    </p>
                                    {/* <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
                                      {category.description}
                                    </p> */}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Users */}
                    {results.users.length > 0 &&
                      (selectedType === "all" || selectedType === "user") && (
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <User className="h-4 w-4" />
                            Users ({results.users.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {results.users.map((user) => (
                              <Link
                                key={user.id}
                                href={`/profile/${user.id}`}
                                onClick={onClose}
                                className="block w-fit rounded-md border p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={user.avatar}
                                      alt={user.name}
                                    />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-1 flex-col items-start">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {user.name}
                                    </p>
                                    {user.bio && (
                                      <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
                                        {user.bio}
                                      </p>
                                    )}
                                    <Badge
                                      variant="secondary"
                                      className="mt-1 text-xs"
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                  </>
                )}
              </div>
            )}

            {!debouncedQuery && (
              <div className="py-8 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Start typing to search for articles, categories, and users
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchDialog;

// Debounce hook: returns the debounced value after the specified delay
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
// function useDebounce(searchQuery: string, arg1: number) {
//     throw new Error("Function not implemented.");
// }
