import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-muted",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-[linear-gradient(135deg,var(--color-blue),var(--color-cyan))] shadow-[0_0_10px_var(--color-cyan)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col items-start gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="text-balance text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
      >
        <span className="text-gradient">{title}</span>
      </h2>
      {description ? <p className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
