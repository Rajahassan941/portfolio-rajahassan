"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { TechIcon, techColor } from "@/components/icons/tech-icon";
import type { TechId } from "@/constants/tech";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false, loading: () => null });

/* ------------------------------------------------------------------ */
/* Code editor content (hand-tokenised for zero-runtime highlighting)  */
/* ------------------------------------------------------------------ */

type Tok = [cls: string, text: string];
const k = "text-violet-300"; // keyword
const f = "text-sky-300"; // function
const s = "text-emerald-300"; // string
const t = "text-cyan-300"; // type
const p = "text-fg-muted"; // punctuation
const c = "text-fg-subtle italic"; // comment
const v = "text-fg"; // variable

const CODE: Tok[][] = [
  [[c, "// Approve a recovery case, role-aware"]],
  [[k, "export async function "], [f, "approveCase"], [p, "("]],
  [[v, "  caseId"], [p, ": "], [t, "string"], [p, ", "], [v, "user"], [p, ": "], [t, "User"]],
  [[p, ") {"]],
  [[k, "  if "], [p, "(!"], [f, "can"], [p, "("], [v, "user"], [p, ", "], [s, "'case:approve'"], [p, "))"]],
  [[k, "    throw new "], [t, "ForbiddenError"], [p, "();"]],
  [[k, "  const "], [v, "res "], [p, "= "], [k, "await "], [v, "api"], [p, "."], [f, "post"], [p, "("]],
  [[s, "    `/cases/${caseId}/approve`"]],
  [[p, "  );"]],
  [[k, "  return "], [v, "res"], [p, "."], [v, "data "], [k, "satisfies "], [t, "Case"], [p, ";"]],
  [[p, "}"]],
];

const TERMINAL = [
  { text: "$ npm run build", cls: "text-fg" },
  { text: "▲ Next.js · creating optimized build", cls: "text-fg-muted" },
  { text: "✓ Compiled successfully", cls: "text-emerald-300" },
  { text: "✓ Type-checked", cls: "text-emerald-300" },
  { text: "✓ Static pages generated", cls: "text-emerald-300" },
  { text: "→ Ready to ship", cls: "text-cyan-300" },
];

/* ------------------------------------------------------------------ */
/* Floating technology nodes                                           */
/* ------------------------------------------------------------------ */

const NODES: { id: TechId; x: number; y: number; depth: number; delay: number }[] = [
  { id: "react", x: 4, y: 12, depth: 1.4, delay: 0 },
  { id: "nextjs", x: 86, y: 4, depth: 1.1, delay: 1.2 },
  { id: "typescript", x: 94, y: 40, depth: 1.6, delay: 0.6 },
  { id: "node", x: 0, y: 62, depth: 1.2, delay: 1.8 },
  { id: "mongodb", x: 88, y: 84, depth: 1.5, delay: 0.9 },
  { id: "socketio", x: 30, y: 96, depth: 1.0, delay: 2.2 },
];

function Window({
  title,
  className,
  children,
  accent,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-[#0b0b12]/85 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.03)_inset] backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-mono text-[0.68rem] text-fg-subtle">{title}</span>
        {accent && <span className={cn("ml-auto size-1.5 rounded-full", accent)} />}
      </div>
      {children}
    </div>
  );
}

function Terminal({ start }: { start: number }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i = i >= TERMINAL.length + 4 ? 0 : i + 1; // hold on the finished state, then loop
      setCount(Math.min(i, TERMINAL.length));
      timer = setTimeout(step, i === 0 ? 400 : i <= TERMINAL.length ? 520 : 900);
    };
    timer = setTimeout(step, start * 1000 + 600);
    return () => clearTimeout(timer);
  }, [reduced, start]);

  return (
    <div className="space-y-1.5 p-4 font-mono text-[0.7rem] leading-relaxed sm:text-xs" aria-hidden="true">
      {TERMINAL.slice(0, reduced ? TERMINAL.length : count).map((line) => (
        <motion.div
          key={line.text}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={line.cls}
        >
          {line.text}
        </motion.div>
      ))}
      <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-cyan-300/80" />
    </div>
  );
}

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (val) => val * 24 * depth);
  const y = useTransform(my, (val) => val * 24 * depth);
  return { x, y };
}

function FloatingNode({
  node,
  mx,
  my,
  start,
}: {
  node: (typeof NODES)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
  start: number;
}) {
  const layer = useLayer(mx, my, node.depth);
  const color = techColor(node.id);
  return (
    <motion.div
      className="absolute hidden sm:block"
      style={{ left: `${node.x}%`, top: `${node.y}%`, ...layer }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: start + 0.5 + node.delay * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group relative -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ animationDelay: `${node.delay}s` }}
      >
        <div
          className="grid size-12 place-items-center rounded-2xl border border-line bg-[#0d0d15]/90 backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
          style={{ color, boxShadow: `0 0 0 1px rgb(255 255 255 / 0.03) inset, 0 10px 40px -10px ${color}66` }}
        >
          <TechIcon id={node.id} size={22} />
        </div>
      </div>
    </motion.div>
  );
}

export function HeroWorkspace({
  mx,
  my,
  start,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  start: number;
}) {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [showScene, setShowScene] = useState(false);

  // Defer the WebGL scene until the browser is idle so it never competes with first paint.
  useEffect(() => {
    if (reduced || !desktop) return;
    const show = () => setShowScene(true);
    // Safari lacks requestIdleCallback — fall back to a timeout.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(show, 1200);
    return () => clearTimeout(id);
  }, [desktop, reduced]);

  const back = useLayer(mx, my, 0.35);
  const editor = useLayer(mx, my, 0.6);
  const term = useLayer(mx, my, 1);

  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[560px] select-none" aria-hidden="true">
      {/* 3D backdrop */}
      <motion.div
        className="absolute -inset-[18%] opacity-70"
        style={back}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, delay: start + 0.4 }}
      >
        {showScene && <HeroScene />}
        {/* Static glow fallback (always present, sits beneath the canvas) */}
        <div className="absolute inset-[22%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.28),rgb(139_92_246/0.12)_45%,transparent_70%)] blur-2xl" />
      </motion.div>

      {/* Connection lines between nodes */}
      <svg className="absolute inset-0 hidden size-full sm:block" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="hero-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {NODES.map((n, i) => (
          <motion.path
            key={n.id}
            d={`M ${n.x} ${n.y} Q 50 50 ${NODES[(i + 2) % NODES.length].x} ${NODES[(i + 2) % NODES.length].y}`}
            stroke="url(#hero-line)"
            strokeWidth="0.18"
            strokeDasharray="0.8 1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.6, delay: start + 0.6 + i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Code editor */}
      <motion.div className="absolute left-[6%] top-[9%] w-[84%]" style={editor}>
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: start + 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <Window title="src/features/cases/approve.ts" accent="bg-blue shadow-[0_0_8px_var(--color-blue)]">
          <div className="flex gap-4 overflow-hidden p-4 font-mono text-[0.62rem] leading-[1.7] sm:text-[0.72rem]">
            <div className="select-none text-right text-fg-subtle/60">
              {CODE.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="min-w-0 flex-1 whitespace-pre">
              {CODE.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: start + 0.5 + i * 0.07 }}
                >
                  {line.map(([cls, text], j) => (
                    <span key={j} className={cls}>
                      {text}
                    </span>
                  ))}
                  {i === CODE.length - 1 && (
                    <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 animate-blink bg-blue" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
      </motion.div>
      </motion.div>

      {/* Terminal */}
      <motion.div className="absolute bottom-[6%] right-[2%] w-[62%] sm:right-[4%]" style={term}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: start + 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Window title="zsh — build" accent="bg-success shadow-[0_0_8px_var(--color-success)]">
          <div className="h-[9.5rem] sm:h-[10.5rem]">
            <Terminal start={start} />
          </div>
        </Window>
      </motion.div>
      </motion.div>

      {/* Status chip */}
      <motion.div className="absolute bottom-[30%] left-[0%] hidden sm:block" style={term}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: start + 1.2 }}
      >
        <div className="glass flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs shadow-2xl">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success" />
            <span className="relative size-2 rounded-full bg-success" />
          </span>
          <span className="font-mono text-fg-muted">
            api <span className="text-fg">200 OK</span>
          </span>
        </div>
      </motion.div>
      </motion.div>

      {NODES.map((n) => (
        <FloatingNode key={n.id} node={n} mx={mx} my={my} start={start} />
      ))}
    </div>
  );
}
