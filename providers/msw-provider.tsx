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

  // Improved loading state with centered spinner
  if (process.env.NODE_ENV === "development" && !isMSWReady) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "6px solid #e0e0e0",
            borderTop: "6px solid #0078d4",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <span style={{ marginLeft: 16, fontSize: 18, color: "#555" }}>
          Initializing Mock Service Worker...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
