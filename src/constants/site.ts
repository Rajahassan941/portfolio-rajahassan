/**
 * Site-wide constants.
 *
 * Set NEXT_PUBLIC_SITE_URL in your deployment environment (e.g. https://mahamood.dev).
 * It drives canonical URLs, Open Graph, the sitemap and robots.txt.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Provided automatically by Vercel (host only, no protocol).
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  ];
  for (const raw of candidates) {
    const value = raw?.replace(/^﻿/, "").trim().replace(/^["']|["']$/g, "");
    if (!value) continue;
    try {
      return new URL(value).origin;
    } catch {
      // Ignore malformed values and try the next candidate.
    }
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

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
