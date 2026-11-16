"use client";

import { MotionConfig } from "motion/react";

/** Global client providers. `reducedMotion="user"` makes every Motion animation respect the OS setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
