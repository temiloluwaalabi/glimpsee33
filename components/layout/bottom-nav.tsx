"use client";

import { Home, PlusCircle, LogOutIcon, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { allRoutes } from "@/config/constants/routes";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

import { LogoutModal } from "../dialogs/logout-modal";
import { Button } from "../ui/button";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "feeds",
    label: "Feeds",
    icon: PlusCircle,
    href: `${allRoutes.feeds.url}`,
  },
  {
    id: "bookmarks",
    label: "Bookmark",
    icon: Bookmark,
    href: `${allRoutes.bookmarks.url}`,
  },
];

interface MobileBottomNavigationProps {
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export default function MobileBottomNavigation({
  onTabChange,
  className,
}: MobileBottomNavigationProps) {
  const { isAuthenticated } = useAppStore();
  const pathname = usePathname();
  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId);
  };

  return (
    <nav
      className={cn(
        "safe-area-pb dark:bg-dark-400 fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white px-4 py-0 dark:text-white",
        "md:hidden", // Hide on desktop
        className
      )}
    >
      <div className="mx-auto flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={cn(
                "relative flex max-w-[80px] min-w-0 flex-1 flex-col items-center justify-center rounded-lg p-3 transition-all duration-200",
                "hover:bg-gray-50 active:scale-95",
                isActive
                  ? "text-maroon-700"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-300"
              )}
              aria-label={item.label}
            >
              <Link
                href={item.href || "/"}
                className="absolute top-0 left-0 z-40 size-full"
              />
              <div
                className={cn(
                  "relative mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6 transition-colors duration-200",
                    isActive && "stroke-2"
                  )}
                />
                {isActive && (
                  <div className="bg-maroon-700 absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full" />
                )}
              </div>
              <span
                className={cn(
                  "w-full truncate text-center text-xs font-medium transition-colors duration-200",
                  isActive
                    ? "text-maroon-700"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
        {isAuthenticated && (
          <LogoutModal
            trigger={
              <Button
                variant={"ghost"}
                className="relative flex max-w-[80px] min-w-0 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-red-900 p-3 pt-4 text-red-900 transition-all duration-200 hover:bg-red-600 hover:px-2 hover:text-white"
              >
                <LogOutIcon className="mr-2 size-4" />
                Logout
              </Button>
            }
          />
        )}
      </div>
    </nav>
  );
}
