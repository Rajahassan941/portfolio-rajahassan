"use client";

import { useState } from "react";

/**
 * Delay (s) before hero entrance animations start, so they play right as the
 * page loader exits. Returning visitors / reduced-motion users get the
 * `no-intro` class from the inline head script and start almost immediately.
 */
export function useIntroDelay() {
  const [delay] = useState(() => {
    if (typeof document === "undefined") return 0.15;
    return document.documentElement.classList.contains("no-intro") ? 0.15 : 1.05;
  });
  return delay;
}
