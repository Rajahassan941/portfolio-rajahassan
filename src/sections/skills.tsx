"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { skillCategories, skillLevelMeta } from "@/data/skills";
import { SECTION_IDS } from "@/constants/site";
import type { SkillLevel } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon, techColor, techLabel } from "@/components/icons/tech-icon";
import { Icon } from "@/components/icons/icon";
import { useSpotlight } from "@/hooks/use-spotlight";
import { cn } from "@/lib/utils";

const LEVEL_DOTS: Record<SkillLevel, number> = { primary: 3, "hands-on": 2, exposure: 1 };

function LevelDots({ level }: { level: SkillLevel }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1 w-3 rounded-full transition-colors duration-300",
            i < LEVEL_DOTS[level] ? "bg-[var(--c)] opacity-90" : "bg-white/10",
          )}
        />
      ))}
    </span>
  );
}

type Filter = "all" | (typeof skillCategories)[number]["id"];

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");
  const [hoverLevel, setHoverLevel] = useState<SkillLevel | null>(null);
  const onPointerMove = useSpotlight<HTMLLIElement>();

  const items = useMemo(
    () =>
      skillCategories
        .filter((c) => filter === "all" || c.id === filter)
        .flatMap((c) => c.skills.map((s) => ({ ...s, category: c.title, key: `${c.id}-${s.tech}` }))),
    [filter],
  );

  const tabs = [{ id: "all" as const, title: "All", icon: null }, ...skillCategories];
  const activeCategory = skillCategories.find((c) => c.id === filter);

  return (
    <section id={SECTION_IDS.skills} aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(139_92_246/0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="The Toolkit Behind the Work."
          description="Technologies I use to design, build and ship full-stack applications — labelled honestly by how deeply I've used them."
        />

        <Reveal className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <LayoutGroup id="skill-tabs">
            <div
              role="tablist"
              aria-label="Skill categories"
              className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {tabs.map((t) => {
                const active = filter === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    aria-controls="skills-grid"
                    onClick={() => setFilter(t.id)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                      active ? "border-transparent text-fg" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="skill-tab"
                        className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(110deg,rgb(79_124_255/0.25),rgb(139_92_246/0.2))] ring-1 ring-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t.icon && <Icon name={t.icon} size={15} />}
                    {t.title}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-fg-muted" aria-label="Proficiency legend">
            {(Object.keys(skillLevelMeta) as SkillLevel[]).map((lvl) => (
              <li
                key={lvl}
                onPointerEnter={() => setHoverLevel(lvl)}
                onPointerLeave={() => setHoverLevel(null)}
                className="flex cursor-default items-center gap-2"
                style={{ "--c": "#a5b4fc" } as React.CSSProperties}
                title={skillLevelMeta[lvl].description}
              >
                <LevelDots level={lvl} />
                <span>
                  <span className="text-fg">{skillLevelMeta[lvl].label}</span>
                  <span className="hidden sm:inline"> · {skillLevelMeta[lvl].description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.p
              key={activeCategory.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-6 text-sm text-fg-muted"
            >
              {activeCategory.description}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.ul
          id="skills-grid"
          role="tabpanel"
          layout
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {items.map((s, i) => {
              const color = techColor(s.tech);
              const dimmed = hoverLevel !== null && hoverLevel !== s.level;
              return (
                <motion.li
                  key={s.key}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: dimmed ? 0.3 : 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  onPointerMove={onPointerMove}
                  style={{ "--c": color, "--spot": `${color}22` } as React.CSSProperties}
                  className="spotlight border-gradient group relative overflow-hidden rounded-2xl bg-white/[0.02] p-4 transition-[background,transform] duration-500 hover:-translate-y-0.5 hover:bg-white/[0.035]"
                >
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg/60 text-fg-muted transition-[color,box-shadow,border-color] duration-500 group-hover:border-[color:var(--c)]/40 group-hover:text-[color:var(--c)] group-hover:shadow-[0_0_28px_-6px_var(--c)]">
                      <TechIcon id={s.tech} size={20} />
                    </span>
                    <LevelDots level={s.level} />
                  </div>
                  <div className="relative z-10 mt-4">
                    <div className="text-sm font-medium tracking-tight text-fg">{techLabel(s.tech)}</div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] text-fg-subtle">
                      <span>{skillLevelMeta[s.level].label}</span>
                      {filter === "all" && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{s.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
