import type { Differentiator, Interest, Stat, Strength } from "@/types";
import { experiences } from "./experience";
import { projects } from "./projects";
import { skillCategories } from "./skills";

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "About",
  heading: "More Than Just Writing Code.",
  paragraphs: [
    "I'm a Full Stack Developer with hands-on experience building production-ready web applications across different business domains, including fintech and enterprise software.",
    "My experience spans frontend engineering, API integration, backend development, database interactions, and translating complex business requirements into practical software solutions.",
    "I enjoy understanding how businesses operate, collaborating with teams and clients, and developing technology that solves real-world problems.",
  ],
};

export const strengths: Strength[] = [
  {
    title: "Production Application Development",
    description: "Shipping and maintaining features in applications real users depend on.",
    icon: "Rocket",
  },
  {
    title: "Fintech Domain Experience",
    description: "Banking workflows including NPA management and SARFAESI recovery.",
    icon: "Landmark",
  },
  {
    title: "Client & Stakeholder Communication",
    description: "Turning conversations and requirements into clear, buildable scope.",
    icon: "MessagesSquare",
  },
  {
    title: "Frontend Architecture",
    description: "Reusable components and predictable state across complex screens.",
    icon: "Layers",
  },
  {
    title: "API Integration",
    description: "Connecting interfaces to backend services cleanly and reliably.",
    icon: "Webhook",
  },
  {
    title: "Problem Solving",
    description: "Breaking ambiguous business problems into practical solutions.",
    icon: "Puzzle",
  },
];

/**
 * Stats are DERIVED from the data files so they're always truthful.
 * `yearsOfExperience` is manual — leave it `null` to hide that stat.
 */
const yearsOfExperience: number | null = null; // TODO: set e.g. 2

const technologyCount = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export const stats: Stat[] = [
  { label: "Years of experience", value: yearsOfExperience, suffix: "+" },
  { label: "Companies", value: experiences.length, hint: "Professional roles" },
  { label: "Featured projects", value: projects.filter((p) => p.featured).length },
  { label: "Technologies used", value: technologyCount, hint: "Across the stack" },
];

/* ------------------------------------------------------------------ */
/* What makes me different                                             */
/* ------------------------------------------------------------------ */

export const differentiatorsSection = {
  eyebrow: "Approach",
  heading: "I Don't Just Build Interfaces. I Understand the Systems Behind Them.",
};

export const differentiators: Differentiator[] = [
  {
    index: "01",
    title: "Business Understanding",
    description: "Understanding business workflows and translating requirements into functional applications.",
    icon: "Building2",
  },
  {
    index: "02",
    title: "End-to-End Thinking",
    description:
      "Understanding frontend architecture, API integration, backend communication, and database interactions.",
    icon: "Network",
  },
  {
    index: "03",
    title: "Real-World Experience",
    description:
      "Experience working on production applications, including enterprise fintech and banking software.",
    icon: "Boxes",
  },
  {
    index: "04",
    title: "Communication & Collaboration",
    description:
      "Comfortable collaborating with developers, understanding stakeholder requirements, and contributing to client-oriented solutions.",
    icon: "Users",
  },
];

/* ------------------------------------------------------------------ */
/* Journey / philosophy                                                */
/* ------------------------------------------------------------------ */

export const journey = {
  eyebrow: "Journey",
  heading: "Always Learning. Always Building.",
  lead: "The best software I've worked on wasn't just well written — it understood the people using it. I keep sharpening the craft so that understanding turns into products that are fast, maintainable and genuinely useful.",
  quote: "Good engineering is invisible to users. They just notice that everything works.",
};

export const interests: Interest[] = [
  {
    title: "Scalable Software Architecture",
    description: "Structuring codebases and systems so they stay easy to change as they grow.",
    icon: "Network",
  },
  {
    title: "Modern Frontend Engineering",
    description: "Server components, typed APIs and UI that feels instant.",
    icon: "Code2",
  },
  {
    title: "Full Stack Development",
    description: "Owning features from the database schema to the final pixel.",
    icon: "Layers",
  },
  {
    title: "AI-Assisted Development",
    description: "Using AI tools to move faster while keeping judgement and code quality high.",
    icon: "BrainCircuit",
  },
  {
    title: "Performance Optimization",
    description: "Measuring first, then shaving off the milliseconds users actually feel.",
    icon: "Gauge",
  },
  {
    title: "Products That Solve Real Problems",
    description: "Building things with a clear purpose and a measurable reason to exist.",
    icon: "Lightbulb",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactSection = {
  eyebrow: "Contact",
  heading: "Have an Interesting Opportunity?",
  paragraphs: [
    "I'm always interested in connecting with people building meaningful products and solving interesting technical challenges.",
    "Whether you're hiring, collaborating, or simply looking to exchange ideas, let's connect.",
  ],
};
