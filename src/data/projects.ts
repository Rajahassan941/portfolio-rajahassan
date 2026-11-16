import type { Project } from "@/types";

/**
 * Featured projects.
 *
 * - `image`: set to { src: "/projects/<file>.png", alt: "..." } once you have a screenshot
 *   (put files in public/projects). While `null`, an illustrated preview is shown and
 *   clearly labelled as a placeholder.
 * - `links`: add URLs when available; `null` hides the button.
 * - "contribution" and "challenges" are drafted from the project descriptions —
 *   review and refine them so they reflect exactly what you did.
 */
export const projects: Project[] = [
  {
    id: "sarfaesi",
    title: "Loan Recovery & SARFAESI Platform",
    category: "Banking & Fintech",
    tagline: "Enterprise software for NPA management and statutory recovery workflows.",
    overview: [
      "Contributing to enterprise-level banking software designed to streamline Non-Performing Asset (NPA) management and SARFAESI recovery workflows.",
      "Working on complex financial business processes, role-based interfaces, approval workflows, and API integrations.",
    ],
    highlights: [
      "Banking domain workflows",
      "Role-based access",
      "Complex business logic",
      "API integration",
      "React-based frontend development",
    ],
    contribution: [
      "Implement multi-step recovery and approval workflows as React interfaces.",
      "Build reusable components shared across modules and user roles.",
      "Integrate backend APIs and manage application state for data-heavy screens.",
      "Translate banking requirements from stakeholders into working features.",
    ],
    challenges: [
      {
        title: "Encoding regulated processes",
        detail:
          "Recovery workflows follow strict, sequential stages — the UI has to guide users through each step without allowing invalid transitions.",
      },
      {
        title: "Role-aware interfaces",
        detail:
          "Different roles see and act on different parts of the same case, so views and actions must adapt to the user's permissions.",
      },
      {
        title: "Domain complexity",
        detail:
          "Understanding NPA and SARFAESI terminology well enough to question requirements, not just implement them.",
      },
    ],
    tech: ["react", "rest", "rbac", "workflows"],
    image: null,
    links: { live: null, github: null },
    linkNote: "Proprietary enterprise software — source and demo not public.",
    accent: "blue",
    preview: "fintech",
    featured: true,
  },
  {
    id: "digidxdoc",
    title: "DigiDxDoc",
    category: "Healthcare · Medical Imaging",
    tagline: "Interactive medical image visualization with real-time collaboration.",
    overview: [
      "A medical imaging platform focused on improving digital healthcare workflows through interactive medical image visualization, authentication, and real-time collaboration.",
    ],
    highlights: [
      "High-resolution image viewing",
      "Medical imaging viewer integration",
      "Real-time collaboration",
      "Secure authentication",
    ],
    contribution: [
      "Integrated OpenSeadragon and the OHIF Viewer for interactive image exploration.",
      "Implemented real-time features over WebSocket connections.",
      "Wired up authentication with Firebase and JWT-protected requests.",
    ],
    challenges: [
      {
        title: "Large images in the browser",
        detail:
          "Medical images are far larger than typical web assets, so viewing has to rely on tiled, zoomable rendering to stay responsive.",
      },
      {
        title: "Keeping collaborators in sync",
        detail:
          "Real-time updates need to reach every connected user reliably without the interface falling out of step.",
      },
      {
        title: "Securing sensitive data",
        detail: "Healthcare data demands authenticated access on every request and connection.",
      },
    ],
    tech: ["react", "websocket", "openseadragon", "ohif", "firebase", "jwt"],
    image: null,
    links: { live: null, github: null },
    linkNote: null,
    accent: "cyan",
    preview: "imaging",
    featured: true,
  },
  {
    id: "appointment-scheduler",
    title: "Appointment Scheduler",
    category: "Productivity · Web App",
    tagline: "Secure, streamlined appointment booking and management.",
    overview: [
      "A web-based appointment scheduling application with secure authentication and streamlined appointment management.",
    ],
    highlights: ["Secure authentication", "Appointment management", "Email notifications"],
    contribution: [
      "Built the React frontend for booking and managing appointments.",
      "Implemented JWT-based authentication flows.",
      "Integrated EmailJS to send appointment emails from the client.",
    ],
    challenges: [
      {
        title: "Scheduling edge cases",
        detail: "Preventing overlapping bookings and keeping the appointment list consistent after every change.",
      },
      {
        title: "Auth without friction",
        detail: "Protecting user data while keeping the booking flow short and simple.",
      },
    ],
    tech: ["react", "javascript", "jwt", "emailjs"],
    image: null,
    links: { live: null, github: null },
    linkNote: null,
    accent: "violet",
    preview: "scheduler",
    featured: true,
  },
  {
    id: "dine-o-code",
    title: "Dine-O-Code",
    category: "Food · Full Stack",
    tagline: "An interactive food app backed by a Python API and a relational database.",
    overview: [
      "A modern food-related application combining an interactive frontend with backend API integration and database-driven functionality.",
    ],
    highlights: ["Interactive frontend", "REST API integration", "Database-driven features", "JWT auth"],
    contribution: [
      "Developed the React + Vite frontend.",
      "Integrated the FastAPI backend and its SQLite data layer.",
      "Implemented JWT-based authentication between client and API.",
    ],
    challenges: [
      {
        title: "Full-stack contract",
        detail: "Keeping request and response shapes aligned between a React client and a Python API.",
      },
      {
        title: "Stateless auth",
        detail: "Issuing and validating JWTs so protected routes work consistently across the app.",
      },
    ],
    tech: ["react", "vite", "fastapi", "sqlite", "jwt"],
    image: null,
    links: { live: null, github: null },
    linkNote: null,
    accent: "blue",
    preview: "food",
    featured: true,
  },
];
