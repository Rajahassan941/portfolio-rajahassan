import type { TechId } from "@/constants/tech";

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export type SocialKey = "github" | "linkedin" | "email";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  /** Short human-readable handle shown next to the icon. */
  handle: string;
}

export interface Profile {
  name: string;
  firstName: string;
  initials: string;
  title: string;
  /** Rotating roles displayed in the hero. */
  roles: string[];
  headline: string;
  intro: string;
  email: string;
  location: string | null;
  availability: { open: boolean; label: string };
  /** Path (in /public) or absolute URL of the downloadable CV. */
  resumeUrl: string;
  resumeFileName: string;
  socials: SocialLink[];
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export interface Strength {
  title: string;
  description: string;
  icon: IconName;
}

export interface Stat {
  label: string;
  /** `null` hides the stat — never render unverified numbers. */
  value: number | null;
  suffix?: string;
  hint?: string;
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/**
 * Honest proficiency labels.
 * - primary:  used daily in production work
 * - hands-on: used in real projects
 * - exposure: integrated or explored, not a core strength
 */
export type SkillLevel = "primary" | "hands-on" | "exposure";

export interface Skill {
  tech: TechId;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  skills: Skill[];
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: { start: string; end: string };
  current: boolean;
  location: string | null;
  companyUrl: string | null;
  summary: string[];
  responsibilities: string[];
  focus: string[];
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Accent = "blue" | "violet" | "cyan";
export type ProjectPreview = "fintech" | "imaging" | "scheduler" | "food";

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  overview: string[];
  highlights: string[];
  contribution: string[];
  challenges: { title: string; detail: string }[];
  tech: TechId[];
  /** Real screenshot. When `null`, an illustrated preview is rendered instead. */
  image: { src: string; alt: string } | null;
  links: { live: string | null; github: string | null };
  /** Shown when links are unavailable (e.g. proprietary client work). */
  linkNote: string | null;
  accent: Accent;
  preview: ProjectPreview;
  featured: boolean;
}

/* ------------------------------------------------------------------ */
/* Misc                                                                */
/* ------------------------------------------------------------------ */

export interface Differentiator {
  index: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Interest {
  title: string;
  description: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}

/** Lucide icon names used across the data layer (kept as a closed union for type-safety). */
export type IconName =
  | "Rocket"
  | "Landmark"
  | "MessagesSquare"
  | "Layers"
  | "Webhook"
  | "Puzzle"
  | "Monitor"
  | "Server"
  | "Database"
  | "Wrench"
  | "Sparkles"
  | "Workflow"
  | "Network"
  | "Building2"
  | "Users"
  | "Boxes"
  | "Code2"
  | "BrainCircuit"
  | "Gauge"
  | "Lightbulb";
