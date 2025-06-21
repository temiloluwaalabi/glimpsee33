import { Clock, Flame, TrendingUp } from "lucide-react";

export const sortOptions = [
  { value: 'newest', label: 'Latest', icon: Clock, description: 'Most recent first' },
  { value: 'popular', label: 'Popular', icon: Flame, description: 'Most liked content' },
  { value: 'trending', label: 'Trending', icon: TrendingUp, description: 'Hot right now' },
  { value: 'oldest', label: 'Oldest', icon: Clock, description: 'Oldest first' },
];