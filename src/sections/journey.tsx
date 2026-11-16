import { interests, journey } from "@/data/content";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/icons/icon";

/** Concentric rotating rings with orbiting nodes — pure CSS, GPU-cheap. */
function Orbit() {
  const rings = [
    { size: "100%", dur: "38s", dots: 3, reverse: false },
    { size: "72%", dur: "28s", dots: 2, reverse: true },
    { size: "44%", dur: "20s", dots: 1, reverse: false },
  ];
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[380px]">
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.35),rgb(139_92_246/0.15)_50%,transparent_72%)] blur-2xl" />
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
          style={{ width: r.size, height: r.size }}
        >
          <div
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: r.dur, animationDirection: r.reverse ? "reverse" : "normal" }}
          >
            {Array.from({ length: r.dots }, (_, d) => {
              const angle = (360 / r.dots) * d + i * 40;
              const color = ["#4f7cff", "#8b5cf6", "#22d3ee"][(d + i) % 3];
              return (
                <span key={d} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <span
                    className="absolute left-full top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 16px ${color}` }}
                  />
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-line-strong bg-surface/80 font-mono text-sm text-fg-muted shadow-[0_0_60px_-10px_rgb(79_124_255/0.6)] backdrop-blur">
        <span className="text-gradient-accent text-lg font-semibold">{"</>"}</span>
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section id={SECTION_IDS.journey} aria-labelledby="journey-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="journey-title" eyebrow={journey.eyebrow} title={journey.heading} description={journey.lead} />
            <Reveal delay={0.1}>
              <figure className="mt-10 border-l-2 border-violet/50 pl-5">
                <blockquote className="font-serif text-2xl italic leading-snug text-fg sm:text-[1.7rem]">
                  “{journey.quote}”
                </blockquote>
              </figure>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Orbit />
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {interests.map((it) => (
            <RevealItem key={it.title} className="group relative bg-bg p-6 transition-colors duration-500 hover:bg-bg-elevated sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-line text-fg-muted transition-[color,border-color,box-shadow] duration-500 group-hover:border-cyan/40 group-hover:text-cyan-200 group-hover:shadow-[0_0_24px_-6px_rgb(34_211_238/0.8)]">
                  <Icon name={it.icon} size={17} />
                </span>
                <h3 className="font-medium tracking-tight">{it.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{it.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
