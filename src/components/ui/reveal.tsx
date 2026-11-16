"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Amount of the element that must be visible before revealing (0–1). */
  amount?: number;
};

/** Scroll-triggered reveal for a single block. */
export function Reveal({ delay = 0, amount = 0.25, className, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...(fadeUp.show as object), transition: { duration: 0.8, ease: EASE, delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its `<RevealItem>` children into view. */
export function RevealGroup({
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number; amount?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}
