"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { FeedQuery, URLStateConfig } from "@/lib/api/api"

/**
 * Custom React hook for managing URL query parameters in a Next.js application.
 *
 * Provides utilities to read, update, remove, and clear query parameters in the URL,
 * leveraging Next.js router and search params. Ensures that updates to the URL are
 * reflected in the application state and vice versa.
 *
 * @returns An object with the following properties and methods:
 * - `params`: The current URL parameters as a key-value object.
 * - `searchParams`: The current instance of URLSearchParams.
 * - `getParams(key: string): string | null`: Retrieves the value of a specific query parameter.
 * - `getURLParams(): URLStateConfig`: Returns all current URL parameters as an object.
 * - `setParam(key: string, value: string | number | boolean | undefined): void`: Sets or updates a specific query parameter.
 * - `updateURL(newParams: Partial<URLStateConfig>, options?: { replace?: boolean; scroll?: boolean }): void`: Merges new parameters into the URL, optionally replacing or pushing the history entry.
 * - `bathUpdate(updates: Partial<URLStateConfig>): void`: Batch updates multiple query parameters at once.
 * - `removeParam(key: string): void`: Removes a specific query parameter from the URL.
 * - `clearParams(): void`: Clears all query parameters from the URL.
 *
 * @example
 * const {
 *   params,
 *   getParams,
 *   setParam,
 *   removeParam,
 *   clearParams,
 *   updateURL,
 *   bathUpdate
 * } = useURLState();
 *
 * setParam('page', 2);
 * removeParam('filter');
 * clearParams();
 *
 * @remarks
 * - Automatically removes parameters with `undefined`, `null`, or empty string values.
 * - Uses shallow routing to avoid full page reloads.
 * - Designed for use in Next.js app directory with the `useRouter`, `usePathname`, and `useSearchParams` hooks.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/use-router
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
export const useURLState = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const getURLParams = useCallback((): URLStateConfig => {
        const params: URLStateConfig = {};

        searchParams.forEach((value, key) => {
            params[key] = value
        })

        return params
    }, [searchParams])

    // UPDATE URL WITH NEW PARAMETERS

    const updateURL = useCallback((newParams: Partial<URLStateConfig>, options:{
        replace?: boolean; scroll?: boolean
    } = {}) => {

        const {replace= true, scroll=false} = options

        const current = getURLParams()

        const merged = {...current, ...newParams}

        // REMOVE UNDEFINED/NULL VALUES OR EMPTY STRINGS
        Object.keys(merged).forEach(key => {
            if(merged[key] === undefined || merged[key] === null || merged[key] === "") {
                delete merged[key]
            }
        })

        // CREATE NEW URL SEARCH PARAMS 
        const urlSearchParams = new URLSearchParams()
Object.entries(merged).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
        urlSearchParams.set(key, String(value));
    }
})

const newURL = urlSearchParams.toString() ? `${pathname}?${urlSearchParams.toString()}` : pathname

if(replace){
    router.replace(newURL, {scroll})
}else{
    router.push(newURL, {scroll})
}


    }, [getURLParams, pathname, router])


    const getParams = useCallback((key: string): string | null => {
        return searchParams.get(key)
    }, [searchParams])

    const setParam = useCallback((key: string, value: string | number | boolean | undefined) => {
        updateURL({[key]: value})
    }, [updateURL])

    const removeParam = useCallback((key: string) => {
        updateURL({[key]: undefined})
    }, [updateURL])

    const clearParams = useCallback(() => {
        router.replace(pathname, {scroll: false})
    }, [pathname, router])

    const bathUpdate = useCallback((updates: Partial<URLStateConfig>) => {
        updateURL(updates)
    }, [updateURL])

    return {
        params: getURLParams(),
        searchParams,
        getParams,
        getURLParams,
        setParam,
        updateURL,
        bathUpdate,
        removeParam,
        clearParams
    }
}

export const useFeedURLState = () => {
    const urlState = useURLState()

    const getFeedState = useCallback(() => ({
        search: urlState.getParams("q") || "",
        gSearch: urlState.getParams("g") || "",
        category: urlState.getParams("category") || "all",
        sortBy: urlState.getParams("sortBy") || "newest",
        viewMode: (urlState.getParams("viewMode") as "grid" | "list") || "grid",
        page: parseInt(urlState.getParams("page") || "1", 10),
        featured: urlState.getParams("featured") || "false"
    }), [urlState])

    const updateFeedState = useCallback((updates: Partial<FeedQuery>) => {
        const urlUpdates: Partial<URLStateConfig> = {}
        if(updates.search !== undefined){
            urlUpdates.search = updates.search || undefined
        }
        if(updates.category !== undefined){
            urlUpdates.category = updates.category === "all" ? undefined : updates.category
        }
        if(updates.sortBy !== undefined){
            updates.sortBy = updates.sortBy === "newest" ? undefined : updates.sortBy
        }

        if(updates.viewMode !== undefined){
            urlUpdates.viewMode = updates.viewMode === "grid" ? undefined : updates.viewMode
        }
        if(updates.page !== undefined){
            urlUpdates.page = updates.page <= 1 ? undefined : updates.page
        }

        if (updates.featured !== undefined) {
            urlUpdates.featured = updates.featured === false ? undefined : updates.featured
        }
        urlState.updateURL(urlUpdates)
    }, [urlState])

    return {
        ...urlState,
        feedState: getFeedState(),
        updateFeedState,
    }
}
