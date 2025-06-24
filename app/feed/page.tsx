import React from "react";

import FeedsPageSkeleton from "@/components/layout/feeds-page-skeleton";
import { FeedArchivePage } from "@/components/pages/feeds/feed-archive-page";
import ClientOnly from "@/components/shared/client-only";

export default function FeedsArchive() {
  return (
    <React.Suspense fallback={<FeedsPageSkeleton />}>
      <ClientOnly fallback={<FeedsPageSkeleton />}>
        <FeedArchivePage />
      </ClientOnly>
    </React.Suspense>
  );
}
