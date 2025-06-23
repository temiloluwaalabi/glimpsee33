import React from "react";

import { FeedArchivePage } from "@/components/pages/feeds/feed-archive-page";
import ClientOnly from "@/components/shared/client-only";

export default function FeedsArchive() {
  return (
    <React.Suspense>
      <ClientOnly>
        <FeedArchivePage />
      </ClientOnly>
    </React.Suspense>
  );
}
