import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True for values the owner still needs to fill in (see src/data/profile.ts). */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return /YOUR[-_ ]|\[.*?\]|example\.com/i.test(value);
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Relative luminance of a hex colour (0 → black, 1 → white). */
export function luminance(hex: string) {
  const v = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
