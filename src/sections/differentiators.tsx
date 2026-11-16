import { differentiators, differentiatorsSection } from "@/data/content";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon } from "@/components/icons/icon";

export function Differentiators() {
  return (
    <section id={SECTION_IDS.approach} aria-labelledby="approach-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container-x">
        <SectionHeading
          id="approach-title"
          eyebrow={differentiatorsSection.eyebrow}
          title={differentiatorsSection.heading}
          align="center"
          className="max-w-4xl"
        />

        <RevealGroup className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-2" stagger={0.1}>
          {differentiators.map((d) => (
            <RevealItem key={d.index}>
              <SpotlightCard className="group h-full p-7 sm:p-9" spot="rgb(139 92 246 / 0.12)">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="text-6xl font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.18)] transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke:1px_rgb(139_92_246/0.8)] sm:text-7xl">
                      {d.index}
                    </span>
                    <span className="grid size-12 place-items-center rounded-2xl border border-line bg-white/[0.03] text-fg-muted transition-[color,border-color,box-shadow,transform] duration-500 group-hover:-rotate-6 group-hover:border-violet/40 group-hover:text-violet-200 group-hover:shadow-[0_0_30px_-6px_rgb(139_92_246/0.7)]">
                      <Icon name={d.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl font-semibold tracking-tight sm:text-2xl">{d.title}</h3>
                  <p className="mt-3 max-w-md text-pretty leading-relaxed text-fg-muted">{d.description}</p>
                  <span className="mt-8 h-px w-full origin-left scale-x-[0.15] bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan),transparent)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
