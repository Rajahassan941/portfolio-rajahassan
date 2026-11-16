import { ImageIcon } from "lucide-react";
import type { Accent, ProjectPreview as PreviewKind } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Stylised UI illustrations shown until real screenshots are added.
 * They are abstract by design (no fake data/numbers) and carry a visible
 * "placeholder" tag so they're never mistaken for actual product shots.
 */

const ACCENT: Record<Accent, string> = {
  blue: "79 124 255",
  violet: "139 92 246",
  cyan: "34 211 238",
};

const Bar = ({ className }: { className?: string }) => <div className={cn("h-2 rounded-full bg-white/10", className)} />;

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-[6%] bottom-0 top-[10%] overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0b0b12] shadow-[0_-20px_80px_-20px_rgb(var(--a)/0.45)]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <div className="ml-3 h-3 w-1/3 rounded bg-white/[0.06]" />
      </div>
      {children}
    </div>
  );
}

function Fintech() {
  const stages = ["Notice", "Possession", "Valuation", "Auction", "Closure"];
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="hidden w-[22%] flex-col gap-2.5 border-r border-white/[0.06] p-3 sm:flex">
          <div className="h-3 w-3/4 rounded bg-[rgb(var(--a)/0.6)]" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Bar key={i} className={cn("h-2", i === 1 ? "bg-[rgb(var(--a)/0.35)]" : "", i % 2 ? "w-4/5" : "w-3/5")} />
          ))}
        </div>
        <div className="flex-1 space-y-3 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <Bar className="w-1/3 bg-white/20" />
            <div className="flex gap-1.5">
              <div className="h-4 w-12 rounded-full border border-white/10" />
              <div className="h-4 w-12 rounded-full bg-[rgb(var(--a)/0.5)]" />
            </div>
          </div>
          {/* Workflow stepper */}
          <div className="flex items-center gap-1">
            {stages.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1">
                <div
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border text-[0.5rem] font-semibold",
                    i < 3 ? "border-transparent bg-[rgb(var(--a))] text-white" : "border-white/15 text-white/40",
                  )}
                >
                  {i + 1}
                </div>
                {i < stages.length - 1 && <div className={cn("h-px flex-1", i < 2 ? "bg-[rgb(var(--a))]" : "bg-white/10")} />}
              </div>
            ))}
          </div>
          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-white/[0.06]">
            {[0, 1, 2, 3, 4].map((r) => (
              <div key={r} className={cn("flex items-center gap-3 px-3 py-2", r === 0 ? "bg-white/[0.04]" : "border-t border-white/[0.05]")}>
                <Bar className="w-[18%]" />
                <Bar className="w-[26%] bg-white/[0.07]" />
                <Bar className="w-[14%] bg-white/[0.07]" />
                <div
                  className={cn(
                    "ml-auto h-3.5 w-14 rounded-full",
                    r === 0 ? "bg-transparent" : r % 3 === 0 ? "bg-amber-400/25" : r % 2 ? "bg-emerald-400/25" : "bg-[rgb(var(--a)/0.3)]",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Imaging() {
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="flex w-10 flex-col items-center gap-2.5 border-r border-white/[0.06] py-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("size-5 rounded-md", i === 1 ? "bg-[rgb(var(--a)/0.5)]" : "bg-white/[0.07]")} />
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden bg-black">
          {/* Abstract scan */}
          <div className="absolute left-1/2 top-[46%] size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.5)_0%,rgb(255_255_255/0.2)_28%,rgb(var(--a)/0.25)_48%,transparent_70%)] blur-[2px]" />
          <div className="absolute left-[44%] top-[38%] size-[18%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.55),transparent_70%)]" />
          {/* Grid tiles (deep-zoom metaphor) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:25%_25%]" />
          {/* Annotation */}
          <div className="absolute left-[56%] top-[28%] h-[22%] w-[24%] rounded-md border border-dashed border-[rgb(var(--a))]" />
          <div className="absolute left-[56%] top-[20%] h-3 w-16 rounded bg-[rgb(var(--a)/0.8)]" />
          {/* Collaborators */}
          <div className="absolute right-3 top-3 flex -space-x-1.5">
            {["bg-cyan-400", "bg-violet-400", "bg-emerald-400"].map((c) => (
              <span key={c} className={cn("size-5 rounded-full border-2 border-black", c)} />
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/10 bg-black/60 px-2 py-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-3.5 rounded bg-white/15" />
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Scheduler() {
  const booked = new Set([2, 8, 9, 15, 19, 24, 26]);
  return (
    <Chrome>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <Bar className="w-1/4 bg-white/20" />
          <div className="flex gap-1">
            <div className="size-5 rounded-md border border-white/10" />
            <div className="size-5 rounded-md border border-white/10" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "aspect-[1.25] rounded-md border p-1",
                i === 12
                  ? "border-transparent bg-[rgb(var(--a))]"
                  : booked.has(i)
                    ? "border-[rgb(var(--a)/0.3)] bg-[rgb(var(--a)/0.12)]"
                    : "border-white/[0.06]",
              )}
            >
              {booked.has(i) && <div className="h-1 w-3/4 rounded-full bg-[rgb(var(--a)/0.7)]" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] p-2.5">
          <div className="size-6 rounded-full bg-[rgb(var(--a)/0.4)]" />
          <div className="flex-1 space-y-1.5">
            <Bar className="w-1/2 bg-white/20" />
            <Bar className="w-1/3 bg-white/[0.07]" />
          </div>
          <div className="h-5 w-16 rounded-full bg-emerald-400/25" />
        </div>
      </div>
    </Chrome>
  );
}

function Food() {
  return (
    <Chrome>
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn("h-5 w-14 rounded-full", i === 0 ? "bg-[rgb(var(--a)/0.6)]" : "border border-white/10")} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-white/[0.06]">
              <div
                className="aspect-[1.4]"
                style={{
                  background: `radial-gradient(circle at ${30 + i * 9}% 40%, rgb(var(--a) / ${0.55 - i * 0.05}), transparent 60%), radial-gradient(circle at 70% 80%, rgb(251 191 36 / 0.25), transparent 55%), #12121a`,
                }}
              />
              <div className="space-y-1.5 p-2">
                <Bar className="w-3/4 bg-white/20" />
                <div className="flex items-center justify-between">
                  <Bar className="w-1/3 bg-white/[0.07]" />
                  <div className="size-3.5 rounded-full bg-[rgb(var(--a)/0.6)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

const PREVIEWS: Record<PreviewKind, () => React.JSX.Element> = {
  fintech: Fintech,
  imaging: Imaging,
  scheduler: Scheduler,
  food: Food,
};

export function ProjectPreview({ kind, accent }: { kind: PreviewKind; accent: Accent }) {
  const Preview = PREVIEWS[kind];
  return (
    <div
      className="absolute inset-0"
      style={{ "--a": ACCENT[accent] } as React.CSSProperties}
      role="img"
      aria-label="Illustrative project preview (placeholder until a real screenshot is added)"
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgb(var(--a)/0.28),transparent_70%)]" />
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Preview />
      <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-white/60 backdrop-blur">
        <ImageIcon size={11} aria-hidden="true" /> Screenshot placeholder
      </span>
    </div>
  );
}
