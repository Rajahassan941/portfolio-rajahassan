import { about, stats, strengths } from "@/data/content";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Icon } from "@/components/icons/icon";

export function About() {
  const visibleStats = stats.filter((s) => s.value !== null);

  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.heading} />

            {visibleStats.length > 0 && (
              <RevealGroup className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {visibleStats.map((stat) => (
                  <RevealItem key={stat.label} className="bg-bg p-5 sm:p-6 odd:last:col-span-2">
                    <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                      <span className="text-gradient">
                        <AnimatedCounter value={stat.value as number} suffix={stat.suffix} />
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-fg-muted">{stat.label}</div>
                    {stat.hint && <div className="mt-0.5 text-xs text-fg-subtle">{stat.hint}</div>}
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>

          <div>
            <div className="space-y-5 text-pretty text-lg leading-relaxed text-fg-muted">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "text-xl leading-relaxed text-fg sm:text-2xl" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>

            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.07}>
              {strengths.map((s) => (
                <RevealItem key={s.title}>
                  <SpotlightCard className="group h-full p-5 hover:-translate-y-1">
                    <div className="relative z-10">
                      <div className="mb-4 grid size-10 place-items-center rounded-xl border border-line bg-[linear-gradient(135deg,rgb(79_124_255/0.18),rgb(139_92_246/0.08))] text-blue-200 transition-[box-shadow,transform] duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_-2px_rgb(79_124_255/0.55)]">
                        <Icon name={s.icon} size={18} />
                      </div>
                      <h3 className="font-medium tracking-tight text-fg">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.description}</p>
                    </div>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
