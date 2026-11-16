"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Check, Lock } from "lucide-react";
import type { Project } from "@/types";
import { TechIcon, techColor, techLabel } from "@/components/icons/tech-icon";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./project-preview";

type Tab = "overview" | "contribution" | "challenges";
const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "contribution", label: "My contribution" },
  { id: "challenges", label: "Challenges" },
];

const ACCENT_GLOW = {
  blue: "rgb(79 124 255 / 0.12)",
  violet: "rgb(139 92 246 / 0.12)",
  cyan: "rgb(34 211 238 / 0.1)",
} as const;

function TiltMedia({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.14), transparent 50%)`,
  );

  return (
    <div className="[perspective:1400px]">
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (!enabled || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={enabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="group/media relative aspect-[16/11] overflow-hidden rounded-2xl border border-line bg-surface"
      >
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover/media:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover/media:scale-[1.03]">
            <ProjectPreview kind={project.preview} accent={project.accent} />
          </div>
        )}
        {enabled && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/media:opacity-100" style={{ background: glare }} />}
        <span className="absolute bottom-3 right-4 text-[4.5rem] font-semibold leading-none tracking-tighter text-white/[0.06]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tab, setTab] = useState<Tab>("overview");
  const uid = useId();
  const reversed = index % 2 === 1;
  const hasLinks = Boolean(project.links.live || project.links.github);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`${uid}-title`}
      className="border-gradient relative rounded-[1.75rem] bg-[linear-gradient(180deg,rgb(255_255_255/0.035),rgb(255_255_255/0.008))] p-3 sm:p-4"
      style={{ boxShadow: `0 40px 120px -40px ${ACCENT_GLOW[project.accent]}` }}
    >
      <div className={cn("grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10", reversed && "lg:[&>*:first-child]:order-2")}>
        <TiltMedia project={project} index={index} />

        <div className="flex flex-col px-2 pb-3 pt-1 sm:px-3 lg:py-5 lg:pr-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-subtle">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-line-strong" />
            <span className="text-fg-muted">{project.category}</span>
          </div>

          <h3 id={`${uid}-title`} className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-fg-muted">{project.tagline}</p>

          {/* Tabs */}
          <div role="tablist" aria-label={`${project.title} details`} className="mt-6 flex gap-1 rounded-full border border-line bg-white/[0.02] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`${uid}-panel`}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors sm:text-[0.8rem]",
                  tab === t.id ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId={`${uid}-tab`}
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {t.label}
              </button>
            ))}
          </div>

          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${tab}`}
            className="relative mt-5 min-h-[13.5rem] text-[0.95rem] leading-relaxed text-fg-muted"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                {tab === "overview" && (
                  <div className="space-y-4">
                    {project.overview.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {project.highlights.map((h) => (
                        <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted">
                          <Check size={11} className="text-cyan-300" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tab === "contribution" && (
                  <ul className="space-y-3">
                    {project.contribution.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-cyan))]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "challenges" && (
                  <ul className="space-y-4">
                    {project.challenges.map((c) => (
                      <li key={c.title}>
                        <div className="text-sm font-medium text-fg">{c.title}</div>
                        <p className="mt-1 text-sm">{c.detail}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tech */}
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((id) => (
              <li
                key={id}
                style={{ "--c": techColor(id) } as React.CSSProperties}
                className="group/chip inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/50 px-2.5 py-1.5 text-xs text-fg-muted transition-[border-color,color] duration-300 hover:border-[color:var(--c)]/40 hover:text-fg"
              >
                <span className="transition-colors duration-300 group-hover/chip:text-[color:var(--c)]">
                  <TechIcon id={id} size={13} />
                </span>
                {techLabel(id)}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
            {project.links.live && (
              <Magnetic>
                <Button asChild size="sm" variant="primary">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    Live demo <ArrowUpRight />
                  </a>
                </Button>
              </Magnetic>
            )}
            {project.links.github && (
              <Magnetic>
                <Button asChild size="sm" variant="outline">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon size={15} /> Source code
                  </a>
                </Button>
              </Magnetic>
            )}
            {!hasLinks && (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1.5 text-xs text-fg-subtle">
                <Lock size={12} aria-hidden="true" />
                {project.linkNote ?? "Demo & repository links coming soon"}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
