import { Cable, Database, KeyRound, Mail, ScanEye, ScanLine, ShieldCheck, Webhook, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TECH, type TechId, type TechLucideIcon } from "@/constants/tech";
import { luminance } from "@/lib/utils";
import { SIMPLE_ICONS } from "./simple-icons.generated";

const LUCIDE: Record<TechLucideIcon, LucideIcon> = {
  Cable,
  Database,
  KeyRound,
  Mail,
  ScanEye,
  ScanLine,
  ShieldCheck,
  Webhook,
  Workflow,
};

/** Brand colour, lifted for very dark logos so they stay visible on black. */
export function techColor(id: TechId): string {
  const def = TECH[id];
  if (!("si" in def) || !def.si) return "#a5b4fc";
  const hex = SIMPLE_ICONS[def.si].hex;
  return luminance(hex) < 0.08 ? "#f4f4f5" : hex;
}

export function TechIcon({ id, size = 20, className }: { id: TechId; size?: number; className?: string }) {
  const def = TECH[id];
  if ("si" in def && def.si) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
        <path d={SIMPLE_ICONS[def.si].path} />
      </svg>
    );
  }
  const Icon = LUCIDE[def.lucide as TechLucideIcon];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" className={className} />;
}

export function techLabel(id: TechId) {
  return TECH[id].label;
}
