"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media-query subscription via useSyncExternalStore.
 * Returns false during SSR/hydration, then the live match on the client —
 * avoiding setState-in-effect and hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
