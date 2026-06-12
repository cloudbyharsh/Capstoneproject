"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

interface PageTrackerProps {
  event: string;
  props?: Record<string, string | number | boolean>;
}

/**
 * Drop this component into any server-component page to fire a Heap page_viewed
 * event when the page mounts on the client. Renders nothing visible.
 *
 * Usage:
 *   <PageTracker event="providers_page_viewed" />
 *   <PageTracker event="provider_detail_viewed" props={{ providerId: id }} />
 */
export default function PageTracker({ event, props }: PageTrackerProps) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
