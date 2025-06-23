import { Clock, Flame, TrendingUp } from "lucide-react";

import { allRoutes } from "./routes";

export const sortOptions = [
  {
    value: "newest",
    label: "Latest",
    icon: Clock,
    description: "Most recent first",
  },
  {
    value: "popular",
    label: "Popular",
    icon: Flame,
    description: "Most liked content",
  },
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Hot right now",
  },
  {
    value: "oldest",
    label: "Oldest",
    icon: Clock,
    description: "Oldest first",
  },
];

export interface MenuItem {
  name: string;
  href: string;
}

export const MenuItems: MenuItem[] = [
  { name: "Home", href: allRoutes.home.url },
  { name: "Feeds", href: allRoutes.feeds.url },
  { name: "Categories", href: allRoutes.categories.url },
  { name: "Favourites", href: allRoutes.favourite.url },
  { name: "Bookmarks", href: allRoutes.bookmarks.url },
  { name: "Profile", href: allRoutes.profile.url },
];
