"use client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type * as React from "react";

import { getQueryClient } from "@/app/get-query-client";

import { MSWProvider } from "./msw-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MSWProvider>{children}</MSWProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
