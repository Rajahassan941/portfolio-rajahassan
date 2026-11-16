"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']";

/**
 * Trailing ring + glow that grows over interactive elements.
 * Desktop pointers only; the native cursor stays visible for usability.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const gx = useSpring(x, { stiffness: 80, damping: 25 });
  const gy = useSpring(y, { stiffness: 80, damping: 25 });

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as Element | null;
      setHovering(Boolean(t?.closest?.(INTERACTIVE)));
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      {/* Ambient glow that lags behind the pointer */}
      <motion.div
        className="absolute left-0 top-0 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.07),transparent_65%)]"
        style={{ x: gx, y: gy, opacity: hidden ? 0 : 1 }}
      />
      {/* Ring */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        style={{ x: sx, y: sy }}
        animate={{
          width: hovering ? 46 : 26,
          height: hovering ? 46 : 26,
          opacity: hidden ? 0 : 1,
          backgroundColor: hovering ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </div>
  );
}
