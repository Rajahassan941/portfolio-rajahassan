import {
  Boxes,
  BrainCircuit,
  Building2,
  Code2,
  Database,
  Gauge,
  Landmark,
  Layers,
  Lightbulb,
  MessagesSquare,
  Monitor,
  Network,
  Puzzle,
  Rocket,
  Server,
  Sparkles,
  Users,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

const ICONS: Record<IconName, LucideIcon> = {
  Boxes,
  BrainCircuit,
  Building2,
  Code2,
  Database,
  Gauge,
  Landmark,
  Layers,
  Lightbulb,
  MessagesSquare,
  Monitor,
  Network,
  Puzzle,
  Rocket,
  Server,
  Sparkles,
  Users,
  Webhook,
  Workflow,
  Wrench,
};

/** Renders a Lucide icon referenced by name from the data layer. */
export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />;
}
