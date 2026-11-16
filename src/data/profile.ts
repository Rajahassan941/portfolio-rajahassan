import type { NavItem, Profile } from "@/types";
import { SECTION_IDS } from "@/constants/site";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  EDIT ME — personal details.
 *  Anything containing "YOUR-" / "example.com" is a placeholder and is
 *  visibly flagged on the site until you replace it.
 * ─────────────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: "Mahamood Rajahassan",
  firstName: "Mahamood",
  initials: "MR",
  title: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Software Engineer",
    "Fintech Application Developer",
  ],
  headline: "Building Digital Experiences That Make an Impact.",
  intro:
    "I'm Mahamood Rajahassan, a Full Stack Developer specializing in building scalable, intuitive, and high-performance web applications. I turn complex business requirements into elegant digital solutions.",

  email: "your.email@example.com", // TODO: replace
  location: null, // e.g. "Chennai, India" — hidden while null

  availability: { open: true, label: "Available for opportunities" },

  // Drop your CV at public/resume/Mahamood-Rajahassan-Resume.pdf (a placeholder PDF ships with the repo).
  resumeUrl: "/resume/Mahamood-Rajahassan-Resume.pdf",
  resumeFileName: "Mahamood-Rajahassan-Resume.pdf",

  socials: [
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE", // TODO: replace
      handle: "in/YOUR-LINKEDIN-HANDLE",
    },
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/YOUR-GITHUB-USERNAME", // TODO: replace
      handle: "@YOUR-GITHUB-USERNAME",
    },
    {
      key: "email",
      label: "Email",
      href: "mailto:your.email@example.com", // TODO: replace
      handle: "your.email@example.com",
    },
  ],
};

export const navItems: NavItem[] = [
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "Skills", href: `#${SECTION_IDS.skills}` },
  { label: "Experience", href: `#${SECTION_IDS.experience}` },
  { label: "Projects", href: `#${SECTION_IDS.projects}` },
  { label: "Approach", href: `#${SECTION_IDS.approach}` },
  { label: "Contact", href: `#${SECTION_IDS.contact}` },
];
