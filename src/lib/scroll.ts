import type Lenis from "lenis";

/** Module-level handle to the active Lenis instance (set by <SmoothScroll />). */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const NAV_OFFSET = -80;

/** Smoothly scrolls to `#hash`, using Lenis when active and native scrolling otherwise. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenis) {
    lenis.start();
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", hash);
}
