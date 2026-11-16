"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

// The first render (SSR + hydration) is shown immediately so content is never
// hidden behind JavaScript; only later client-side navigations animate in.
let hasMounted = false;

/** Route-level transition: each client navigation fades/lifts the new page in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasMounted;
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
