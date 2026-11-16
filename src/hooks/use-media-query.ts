"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Returns `serverValue` during SSR/hydration
 * and the live match afterwards.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Desktop-class pointer (mouse / trackpad) — gates hover-only effects like the custom cursor. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
