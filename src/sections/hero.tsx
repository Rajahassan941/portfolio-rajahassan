"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialIcon } from "@/components/icons/brand-icons";
import { RoleRotator } from "@/components/hero/role-rotator";
import { HeroWorkspace } from "@/components/hero/hero-workspace";
import { useIntroDelay } from "@/hooks/use-intro-delay";
import { scrollToHash } from "@/lib/scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Splits the headline so each word can rise from behind a mask. The final word gets the accent treatment. */
function Headline({ text, start }: { text: string; start: number }) {
  const words = text.split(" ");
  const accentFrom = words.length - 1;
  return (
    <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-flex overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className={
                i >= accentFrom
                  ? "font-serif font-normal italic tracking-[-0.02em] text-gradient-accent pr-[0.08em]"
                  : "text-gradient"
              }
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 1, delay: start + i * 0.07, ease: EASE }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </span>
    </h1>
  );
}

export function Hero() {
  const start = useIntroDelay();
  const ref = useRef<HTMLElement>(null);

  // Normalised pointer position (-0.5 … 0.5) shared by the spotlight and parallax layers.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: start + delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      id={SECTION_IDS.hero}
      onPointerMove={onPointerMove}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-10 lg:pt-24"
    >
      {/* Background: grid, aurora, cursor spotlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
        <div className="absolute -left-40 -top-40 size-[640px] rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.22),transparent_65%)] blur-3xl" />
        <div className="absolute -right-32 top-24 size-[560px] rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.18),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/3 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.1),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--hx,50%)_var(--hy,30%),rgb(79_124_255/0.09),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-8">
        <div className="relative z-10 flex flex-col items-start">
          {profile.availability.open && (
            <motion.div {...fade(0)}>
              <span className="relative inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] py-1.5 pl-3 pr-4 text-xs font-medium text-emerald-200">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
                  <span className="relative size-2 rounded-full bg-emerald-400" />
                </span>
                {profile.availability.label}
              </span>
            </motion.div>
          )}

          <div className="mt-7">
            <Headline text={profile.headline} start={start + 0.1} />
          </div>

          <motion.p {...fade(0.55)} className="mt-6 flex flex-wrap items-center gap-x-2 text-lg text-fg-muted sm:text-xl">
            <span className="font-mono text-sm text-fg-subtle">~/</span>
            <RoleRotator roles={profile.roles} />
          </motion.p>

          <motion.p {...fade(0.65)} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-[1.075rem]">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.78)} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
                <a
                  href={`#${SECTION_IDS.projects}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(`#${SECTION_IDS.projects}`);
                  }}
                >
                  Explore My Work
                  <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={profile.resumeUrl} download={profile.resumeFileName}>
                  <Download className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div {...fade(0.9)} className="mt-9 flex items-center gap-5">
            <span className="h-px w-10 bg-line-strong" />
            <ul className="flex items-center gap-2.5" aria-label="Social links">
              {profile.socials.map((s) => (
                <li key={s.key}>
                  <Magnetic strength={0.4}>
                    <a
                      href={s.href}
                      target={s.key === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-full border border-line bg-white/[0.03] text-fg-muted transition-[color,border-color,background,box-shadow] duration-300 hover:border-blue/50 hover:bg-blue/10 hover:text-fg hover:shadow-[0_0_24px_-4px_rgb(79_124_255/0.6)]"
                    >
                      <SocialIcon name={s.key} />
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="relative">
          <HeroWorkspace mx={mx} my={my} start={start} />
        </div>
      </div>

      <motion.a
        href={`#${SECTION_IDS.about}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToHash(`#${SECTION_IDS.about}`);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: start + 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-fg-subtle transition-colors hover:text-fg-muted lg:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <ArrowDown size={14} className="animate-float" />
      </motion.a>
    </section>
  );
}
