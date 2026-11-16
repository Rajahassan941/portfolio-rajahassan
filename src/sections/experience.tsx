"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { ArrowUpRight, Briefcase, Check } from "lucide-react";
import { experiences } from "@/data/experience";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn, isPlaceholder } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function DateText({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return (
      <span
        title="Placeholder — update in src/data/experience.ts"
        className="rounded border border-dashed border-warn/40 px-1.5 py-0.5 text-warn/80"
      >
        {value.replace(/[[\]]/g, "")}
      </span>
    );
  }
  return <span>{value}</span>;
}

export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-timeline-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 65%", end: "bottom 60%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-timeline-dot]").forEach((dot) => {
          gsap.fromTo(
            dot,
            { scale: 0.4, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2.5)",
              scrollTrigger: { trigger: dot, start: "top 65%", toggleActions: "play none none reverse" },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id={SECTION_IDS.experience} aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="container-x" ref={root}>
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've Been Building."
          description="Production work across enterprise fintech and modern web products — from business workflows to end-to-end delivery."
        />

        <div data-timeline className="relative mt-16 sm:mt-20">
          {/* Track + scroll-scrubbed progress */}
          <div aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-line md:left-[calc(14rem+11px)]">
            <div
              data-timeline-progress
              className="absolute inset-0 origin-top bg-[linear-gradient(180deg,var(--color-blue),var(--color-violet),var(--color-cyan))] shadow-[0_0_12px_rgb(79_124_255/0.8)]"
            />
          </div>

          <ol className="relative space-y-10 sm:space-y-14">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="relative grid gap-4 pl-10 md:grid-cols-[14rem_1fr] md:gap-0 md:pl-0">
              {/* Dot */}
              <span
                data-timeline-dot
                aria-hidden="true"
                className="absolute left-0 top-1.5 grid size-[23px] place-items-center rounded-full border border-line-strong bg-bg md:left-[14rem]"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    exp.current ? "bg-cyan shadow-[0_0_14px_var(--color-cyan)]" : "bg-violet shadow-[0_0_14px_var(--color-violet)]",
                  )}
                />
              </span>

              {/* Meta column */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="md:pr-12 md:pt-1 md:text-right"
              >
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fg-muted md:justify-end">
                  <DateText value={exp.period.start} />
                  <span aria-hidden="true">—</span>
                  <DateText value={exp.period.end} />
                </div>
                {exp.current && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/[0.07] px-2.5 py-0.5 text-[0.7rem] font-medium text-cyan-200">
                    <span className="size-1.5 rounded-full bg-cyan" /> Current role
                  </span>
                )}
                {exp.location && <div className="mt-2 text-xs text-fg-subtle">{exp.location}</div>}
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="md:pl-14"
              >
                <SpotlightCard className="p-6 sm:p-8" spot={i === 0 ? "rgb(34 211 238 / 0.09)" : "rgb(139 92 246 / 0.1)"}>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{exp.role}</h3>
                        <div className="mt-1.5 flex items-center gap-2 text-fg-muted">
                          <Briefcase size={15} aria-hidden="true" />
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:text-fg"
                            >
                              {exp.company} <ArrowUpRight size={14} />
                            </a>
                          ) : (
                            <span>{exp.company}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-pretty leading-relaxed text-fg-muted">
                      {exp.summary.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>

                    {exp.responsibilities.length > 0 && (
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {exp.responsibilities.map((r) => (
                          <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue/15 text-blue-300">
                              <Check size={10} strokeWidth={3} aria-hidden="true" />
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                      {exp.focus.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-fg-muted"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
