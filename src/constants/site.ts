/**
 * Site-wide constants.
 *
 * Set NEXT_PUBLIC_SITE_URL in your deployment environment (e.g. https://mahamood.dev).
 * It drives canonical URLs, Open Graph, the sitemap and robots.txt.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE = {
  name: "Mahamood Rajahassan",
  title: "Mahamood Rajahassan — Full Stack Developer",
  description:
    "Full Stack Developer building scalable, intuitive and high-performance web applications — with production experience in enterprise fintech and banking software.",
  keywords: [
    "Mahamood Rajahassan",
    "Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Software Engineer",
    "Fintech Developer",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  locale: "en_US",
  themeColor: "#07070a",
} as const;

/** Section ids — used by navigation, scroll-spy and anchors. */
export const SECTION_IDS = {
  hero: "home",
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  approach: "approach",
  journey: "journey",
  contact: "contact",
} as const;
