"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Reads the current year only on the client so the page stays fully
 * prerenderable under `cacheComponents` (reading time during prerender
 * would force dynamic rendering). The server renders a sensible fallback.
 */
export function CurrentYear({ fallback = "2026" }: { fallback?: string }) {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => fallback,
  );
  return <>{year}</>;
}
