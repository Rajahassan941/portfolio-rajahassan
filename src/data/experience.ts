import type { Experience } from "@/types";

/**
 * Career timeline, newest first.
 * TODO: replace the bracketed dates — they are rendered with a placeholder style until you do.
 */
export const experiences: Experience[] = [
  {
    id: "safe-software",
    company: "SAFE Software",
    role: "Associate – Full Stack Developer",
    period: { start: "[Start date]", end: "Present" },
    current: true,
    location: null,
    companyUrl: null,
    summary: [
      "Contributing to enterprise-grade software solutions with a focus on frontend development, business workflow implementation, and API integration.",
      "Working on fintech and banking applications, including NPA management and SARFAESI workflows.",
    ],
    responsibilities: [
      "Implementing complex business workflows in React applications.",
      "Developing and maintaining reusable frontend components.",
      "Integrating backend APIs and handling application state.",
      "Working with banking and financial domain requirements.",
      "Collaborating with backend teams and understanding database-driven workflows.",
      "Communicating with stakeholders and contributing to client-oriented requirements.",
    ],
    focus: ["Fintech", "Banking", "React", "API Integration", "Stakeholders"],
  },
  {
    id: "trigeminal-ai",
    company: "Trigeminal AI",
    role: "Full Stack Web Developer",
    period: { start: "[Start date]", end: "[End date]" },
    current: false,
    location: null,
    companyUrl: null,
    summary: [
      "Worked on developing modern web applications, implementing frontend functionality, integrating APIs, and collaborating on end-to-end application development.",
      "Also contributed to mentoring and supporting junior developers.",
    ],
    responsibilities: [],
    focus: ["Full Stack", "Frontend", "API Integration", "Mentoring"],
  },
];
