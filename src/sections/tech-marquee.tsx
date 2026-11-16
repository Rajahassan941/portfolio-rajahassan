import { TechIcon, techLabel } from "@/components/icons/tech-icon";
import type { TechId } from "@/constants/tech";

const ITEMS: TechId[] = [
  "react", "nextjs", "typescript", "javascript", "redux", "tanstackQuery", "node", "express",
  "socketio", "mongodb", "mysql", "tailwind", "mui", "git", "gitlab", "nginx", "linux", "postman",
];

/** Infinite logo strip. Pure CSS animation (paused for reduced-motion users via globals.css). */
export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-line bg-bg-elevated/40 py-7">
      <div className="mask-fade-x group flex overflow-hidden">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
          >
            {ITEMS.map((id) => (
              <li key={id} className="flex items-center gap-2.5 text-fg-subtle transition-colors duration-300 hover:text-fg">
                <TechIcon id={id} size={18} />
                <span className="whitespace-nowrap text-sm font-medium">{techLabel(id)}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
