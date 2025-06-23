"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { FeedQuery, URLStateConfig } from "@/lib/api/api";

export const useURLState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getURLParams = useCallback((): URLStateConfig => {
    const params: URLStateConfig = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }, [searchParams]);

  // UPDATE URL WITH NEW PARAMETERS
  const updateURL = useCallback(
    (
      newParams: Partial<URLStateConfig>,
      options: {
        replace?: boolean;
        scroll?: boolean;
      } = {}
    ) => {
      const { replace = true, scroll = false } = options;

      const current = getURLParams();

      console.log("CURRENT", current);
      console.log("PARAMS", newParams);

      const merged = { ...current, ...newParams };

      console.log("MERGED", merged);

      // REMOVE UNDEFINED/NULL VALUES OR EMPTY STRINGS
      Object.keys(merged).forEach((key) => {
        if (
          merged[key] === undefined ||
          merged[key] === null ||
          merged[key] === ""
        ) {
          delete merged[key];
        }
      });

      // CREATE NEW URL SEARCH PARAMS
      const urlSearchParams = new URLSearchParams();
      Object.entries(merged).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          urlSearchParams.set(key, String(value));
        }
      });

      const newURL = urlSearchParams.toString()
        ? `${pathname}?${urlSearchParams.toString()}`
        : pathname;

      console.log("NEW URL", newURL);
      if (replace) {
        router.replace(newURL, { scroll });
      } else {
        router.push(newURL, { scroll });
      }
    },
    [getURLParams, pathname, router]
  );

  const getParams = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: string | number | boolean | undefined) => {
      updateURL({ [key]: value });
    },
    [updateURL]
  );

  const removeParam = useCallback(
    (key: string) => {
      updateURL({ [key]: undefined });
    },
    [updateURL]
  );

  const clearParams = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Fixed typo: was "bathUpdate", now "batchUpdate"
  const batchUpdate = useCallback(
    (updates: Partial<URLStateConfig>) => {
      updateURL(updates);
    },
    [updateURL]
  );

  return {
    params: getURLParams(),
    searchParams,
    getParams,
    getURLParams,
    setParam,
    updateURL,
    batchUpdate, // Fixed typo
    removeParam,
    clearParams,
  };
};

export const useFeedURLState = () => {
  const urlState = useURLState();

  const getFeedState = useCallback(
    () => ({
      search: urlState.getParams("search") || "", // Fixed: was "q"
      gSearch: urlState.getParams("g") || "",
      category: urlState.getParams("category") || "all",
      sortBy: urlState.getParams("sortBy") || "newest",
      viewMode: (urlState.getParams("viewMode") as "grid" | "list") || "grid",
      page: parseInt(urlState.getParams("page") || "1", 10),
      featured: urlState.getParams("featured") === "true", // Fixed: convert to boolean
    }),
    [urlState]
  );

  const updateFeedState = useCallback(
    (updates: Partial<FeedQuery>) => {
      const urlUpdates: Partial<URLStateConfig> = {};

      if (updates.search !== undefined) {
        urlUpdates.search = updates.search || undefined;
      }
      if (updates.globalSearch !== undefined) {
        // Fixed: handle globalSearch
        urlUpdates.g = updates.globalSearch || undefined;
      }
      if (updates.category !== undefined) {
        urlUpdates.category =
          updates.category === "all" ? undefined : updates.category;
      }
      if (updates.sortBy !== undefined) {
        urlUpdates.sortBy = // Fixed: was reassigning updates.sortBy
          updates.sortBy === "newest" ? undefined : updates.sortBy;
      }
      if (updates.viewMode !== undefined) {
        urlUpdates.viewMode =
          updates.viewMode === "grid" ? undefined : updates.viewMode;
      }
      if (updates.page !== undefined) {
        urlUpdates.page = updates.page <= 1 ? undefined : updates.page;
      }
      if (updates.featured !== undefined) {
        urlUpdates.featured =
          updates.featured === false ? undefined : updates.featured;
      }

      urlState.updateURL(urlUpdates);
    },
    [urlState]
  );

  return {
    ...urlState,
    feedState: getFeedState(),
    updateFeedState,
  };
};
