"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SessionData } from "@/lib/auth/session";
import { useAppStore } from "@/store/use-app-store";

const sessionApiRoute = "/api/auth/session";

export async function fetchJSON<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => {
    if (!res.ok) {
      // Don't throw for 401 - it just means not authenticated

      // toast(`Error: ${res.statusText}`);
      throw new Error(`Error: ${res.statusText}`);
    }

    return res.json();
  });
}

export default function useSession() {
  const [session, setSession] = useState<SessionData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

      try {
        const data = await fetchJSON<SessionData>(sessionApiRoute);
        setSession(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Handle login
  const clientLoginSession = async (username: string) => {
    setIsLoading(true);
    try {
      const data = await fetchJSON<SessionData>(sessionApiRoute, {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      setSession(data);
      router.refresh();
      router.push("/");
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const clientLogoutSession = async () => {
    setIsLoading(true);
    try {
      const data = await fetchJSON<SessionData>(sessionApiRoute, {
        method: "DELETE",
      });
      useAppStore.getState().logout();
      setSession(data);
      setError(null);
      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    clientLoginSession,
    clientLogoutSession,
    isLoading,
    error,
  };
}
