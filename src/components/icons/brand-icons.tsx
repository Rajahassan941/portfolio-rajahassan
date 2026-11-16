import type { SVGProps } from "react";
import { Mail } from "lucide-react";
import { SIMPLE_ICONS } from "./simple-icons.generated";
import type { SocialKey } from "@/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function GithubIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d={SIMPLE_ICONS.github.path} />
    </svg>
  );
}

/** LinkedIn's mark is not in simple-icons, so the path is inlined here. */
export function LinkedinIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function SocialIcon({ name, size = 18, ...props }: IconProps & { name: SocialKey }) {
  if (name === "github") return <GithubIcon size={size} {...props} />;
  if (name === "linkedin") return <LinkedinIcon size={size} {...props} />;
  return <Mail size={size} aria-hidden="true" />;
}
