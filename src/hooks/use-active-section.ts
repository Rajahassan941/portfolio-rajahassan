"use client";

import { useEffect, useState } from "react";

/** Scroll-spy: returns the id of the section currently nearest the top third of the viewport. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (!visible.size) return setActive(null);
        // Pick the section whose top is closest to (but ideally above) the anchor line.
        const [best] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
        setActive(best[0]);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
