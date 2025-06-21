"use client";

import React, { useEffect, useState } from "react";

import { enableMocking } from "@/lib/msw";

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (process.env.NODE_ENV === "development") {
        
        await enableMocking();
      }
      setIsMSWReady(true);
    };

    initMSW();
  }, []);

  // Optional: Show loading state until MSW is ready
  if (process.env.NODE_ENV === "development" && !isMSWReady) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <>{children}</>;
}