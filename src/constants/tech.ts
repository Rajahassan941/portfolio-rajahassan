import type { SimpleIconSlug } from "@/components/icons/simple-icons.generated";

/**
 * Single registry for every technology referenced anywhere on the site.
 * - `si`     → brand logo from simple-icons (see scripts/generate-icons.mjs)
 * - `lucide` → generic glyph when no official/permitted logo exists
 */
type TechDef =
  | { label: string; si: SimpleIconSlug; lucide?: never }
  | { label: string; lucide: TechLucideIcon; si?: never };

export type TechLucideIcon =
  | "Database"
  | "Webhook"
  | "Cable"
  | "KeyRound"
  | "ScanEye"
  | "ScanLine"
  | "Mail"
  | "ShieldCheck"
  | "Workflow";

const defineTech = <T extends Record<string, TechDef>>(t: T) => t;

export const TECH = defineTech({
  // Frontend
  javascript: { label: "JavaScript", si: "javascript" },
  typescript: { label: "TypeScript", si: "typescript" },
  react: { label: "React.js", si: "react" },
  nextjs: { label: "Next.js", si: "nextdotjs" },
  redux: { label: "Redux Toolkit", si: "redux" },
  tanstackQuery: { label: "TanStack Query", si: "reactquery" },
  tanstackTable: { label: "TanStack Table", si: "reacttable" },
  mui: { label: "Material UI", si: "mui" },
  tailwind: { label: "Tailwind CSS", si: "tailwindcss" },
  html: { label: "HTML5", si: "html5" },
  css: { label: "CSS3", si: "css" },
  vite: { label: "Vite", si: "vite" },

  // Backend
  node: { label: "Node.js", si: "nodedotjs" },
  express: { label: "Express.js", si: "express" },
  rest: { label: "REST APIs", lucide: "Webhook" },
  jwt: { label: "JWT Authentication", si: "jsonwebtokens" },
  websocket: { label: "WebSocket", lucide: "Cable" },
  socketio: { label: "Socket.IO", si: "socketdotio" },
  fastapi: { label: "FastAPI", si: "fastapi" },

  // Database
  mongodb: { label: "MongoDB", si: "mongodb" },
  sql: { label: "SQL", lucide: "Database" },
  mysql: { label: "MySQL", si: "mysql" },
  oracle: { label: "Oracle Database", lucide: "Database" },
  sqlite: { label: "SQLite", si: "sqlite" },

  // Tools & infrastructure
  git: { label: "Git", si: "git" },
  gitlab: { label: "GitLab", si: "gitlab" },
  linux: { label: "Linux", si: "linux" },
  pm2: { label: "PM2", si: "pm2" },
  nginx: { label: "Nginx", si: "nginx" },
  postman: { label: "Postman", si: "postman" },
  docker: { label: "Docker", si: "docker" },

  // Additional
  azureAd: { label: "Azure AD / IDAM", lucide: "KeyRound" },
  openseadragon: { label: "OpenSeadragon", lucide: "ScanEye" },
  ohif: { label: "OHIF Viewer", lucide: "ScanLine" },
  firebase: { label: "Firebase Auth", si: "firebase" },
  emailjs: { label: "EmailJS", lucide: "Mail" },
  rbac: { label: "Role-Based Access", lucide: "ShieldCheck" },
  workflows: { label: "Workflow Engines", lucide: "Workflow" },
});

export type TechId = keyof typeof TECH;
