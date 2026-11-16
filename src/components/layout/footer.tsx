import { ArrowUp } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { SocialIcon } from "@/components/icons/brand-icons";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(79_124_255/0.6),rgb(34_211_238/0.6),transparent)]" />
      <div className="container-x flex flex-col gap-10 py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold">
                <span className="text-gradient-accent">{profile.initials}</span>
              </span>
              <span className="font-medium tracking-tight">{profile.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {profile.title} building scalable, thoughtful web applications — from banking workflows to real-time
              platforms.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-subtle">
            © <CurrentYear /> {profile.name}. Designed & built with Next.js, TypeScript & Motion.
          </p>
          <div className="flex items-center gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <SocialIcon name={s.key} size={15} />
              </a>
            ))}
            <a
              href="#home"
              aria-label="Back to top"
              className="ml-2 grid size-9 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <ArrowUp size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
