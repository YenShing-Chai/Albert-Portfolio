"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * Returns true when the user has requested reduced motion.
 * Used to gate decorative animations (cursor, parallax, particle field).
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
