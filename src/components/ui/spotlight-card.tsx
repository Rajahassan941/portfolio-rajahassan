"use client";

import type { HTMLAttributes } from "react";
import { useSpotlight } from "@/hooks/use-spotlight";
import { cn } from "@/lib/utils";

/** Glass card with a cursor-following glow and gradient hairline border. */
export function SpotlightCard({
  className,
  children,
  spot,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { spot?: string }) {
  const onPointerMove = useSpotlight<HTMLDivElement>();
  return (
    <div
      onPointerMove={onPointerMove}
      style={{ ...(spot ? ({ "--spot": spot } as React.CSSProperties) : null), ...style }}
      className={cn(
        "spotlight border-gradient relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.01))] transition-[transform,background] duration-500 ease-out-expo",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
