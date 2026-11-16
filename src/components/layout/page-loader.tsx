"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";

/**
 * Brief branded intro on first visit per session. The page renders underneath,
 * so it never blocks content from loading. Skipped for reduced-motion users.
 */
export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* storage unavailable — just play it */
    }
    const t = setTimeout(() => setVisible(false), reduced || seen ? 0 : 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          aria-hidden="true"
          data-loader
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid size-16 place-items-center rounded-2xl border border-line bg-surface font-mono text-lg font-semibold tracking-tight"
            >
              <span className="text-gradient-accent">{profile.initials}</span>
              <span className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle,rgb(79_124_255/0.45),transparent_70%)] blur-xl" />
            </motion.div>
            <div className="h-px w-40 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-[linear-gradient(90deg,var(--color-blue),var(--color-violet),var(--color-cyan))]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
