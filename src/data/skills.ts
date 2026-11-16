import type { SkillCategory } from "@/types";

/**
 * Proficiency is intentionally conservative — adjust `level` to match reality:
 *   "primary"  → used daily in production
 *   "hands-on" → used in real projects
 *   "exposure" → integrated / explored, not a core strength
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Component architecture, state, data-fetching and polished, accessible UI.",
    icon: "Monitor",
    skills: [
      { tech: "javascript", level: "primary" },
      { tech: "typescript", level: "primary" },
      { tech: "react", level: "primary" },
      { tech: "nextjs", level: "hands-on" },
      { tech: "redux", level: "hands-on" },
      { tech: "tanstackQuery", level: "hands-on" },
      { tech: "tanstackTable", level: "hands-on" },
      { tech: "mui", level: "hands-on" },
      { tech: "tailwind", level: "hands-on" },
      { tech: "html", level: "primary" },
      { tech: "css", level: "primary" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, authentication and real-time communication.",
    icon: "Server",
    skills: [
      { tech: "node", level: "hands-on" },
      { tech: "express", level: "hands-on" },
      { tech: "rest", level: "primary" },
      { tech: "jwt", level: "hands-on" },
      { tech: "websocket", level: "hands-on" },
      { tech: "socketio", level: "hands-on" },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Document and relational data, and database-driven workflows.",
    icon: "Database",
    skills: [
      { tech: "mongodb", level: "hands-on" },
      { tech: "sql", level: "hands-on" },
      { tech: "mysql", level: "hands-on" },
      { tech: "oracle", level: "hands-on" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    description: "Version control, servers, process management and API tooling.",
    icon: "Wrench",
    skills: [
      { tech: "git", level: "primary" },
      { tech: "gitlab", level: "hands-on" },
      { tech: "linux", level: "hands-on" },
      { tech: "pm2", level: "hands-on" },
      { tech: "nginx", level: "hands-on" },
      { tech: "postman", level: "primary" },
      { tech: "docker", level: "exposure" },
    ],
  },
  {
    id: "additional",
    title: "Additional Experience",
    description: "Integrations and specialised libraries I've worked with on specific projects.",
    icon: "Sparkles",
    skills: [
      { tech: "azureAd", level: "exposure" },
      { tech: "openseadragon", level: "exposure" },
      { tech: "ohif", level: "exposure" },
      { tech: "firebase", level: "exposure" },
    ],
  },
];

export const skillLevelMeta = {
  primary: { label: "Primary", description: "Used daily in production work" },
  "hands-on": { label: "Hands-on", description: "Used in real projects" },
  exposure: { label: "Exposure", description: "Integrated or explored" },
} as const;
