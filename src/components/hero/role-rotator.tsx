"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Cycles through roles with a vertical blur-slide. Screen readers get the full list once. */
export function RoleRotator({ roles, interval = 2600 }: { roles: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [interval, reduced, roles.length]);

  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden align-bottom">
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          aria-hidden="true"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-accent whitespace-nowrap font-semibold"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
