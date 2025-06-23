import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getRandomImage = (
  width: number = 800,
  height: number = 600,
  category?: string
) => {
  const categories = ["technology", "business", "science", "nature", "people"];
  const selectedCategory =
    category || categories[Math.floor(Math.random() * categories.length)];
  return `https://picsum.photos/${width}/${height}?random=${Math.random()}&category=${selectedCategory}`;
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return date.toLocaleDateString();
};

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

/**
 * Enhanced formUrlQuery function with better type handling
 */
// export const formUrlQuery = ({
//   params,
//   updates,
//   options = {},
// }: UrlQueryParams): string => {
//   const { skipNull = true, skipEmptyString = true } = options;

//   // Parse current params
//   const currentUrl = { ...qs.parse(params) };

//   // Process updates
//   Object.entries(updates).forEach(([key, value]) => {
//     if (
//       (skipNull && (value === null || value === undefined)) ||
//       (skipEmptyString && value === "")
//     ) {
//       delete currentUrl[key];
//     } else if (value instanceof Date) {
//       currentUrl[key] = value.toISOString();
//     } else if (typeof value === "boolean") {
//       currentUrl[key] = value.toString();
//     } else if (Array.isArray(value)) {
//       if (value.length === 0 && skipEmptyString) {
//         delete currentUrl[key];
//       } else {
//         currentUrl[key] = value.join(",");
//       }
//     } else if (value !== undefined && value !== null) {
//       currentUrl[key] = value.toString();
//     }
//   });

//   return qs.stringifyUrl(
//     {
//       url: typeof window !== "undefined" ? window.location.pathname : "",
//       query: currentUrl,
//     },
//     {
//       skipNull,
//       skipEmptyString,
//     }
//   );
// };

// export const removeKeysFromQuery = ({
//   params,
//   keysToRemove,
// }: RemoveUrlQueryParams) => {
//   const currentUrl = { ...qs.parse(params) }; // Clone to avoid direct mutation

//   keysToRemove.forEach((key) => {
//     delete currentUrl[key];
//   });

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl,
//     },
//     {
//       skipNull: true,
//       skipEmptyString: true,
//     }
//   );
// };

/**
 * Fetches a specific query parameter from the URL.
 */
// export const getQueryParam = (params: string, key: string) => {
//   const currentUrl = qs.parse(params);
//   return currentUrl[key] || null;
// };
