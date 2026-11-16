"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/icons/brand-icons";

const sectionIds = navItems.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-2 py-2 pl-4 transition-[background,border-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open
              ? "border-line bg-bg/70 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#home" onClick={go("#home")} className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="relative grid size-8 place-items-center rounded-lg border border-line bg-surface font-mono text-[0.7rem] font-semibold">
              <span className="text-gradient-accent">{profile.initials}</span>
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.85rem] transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
              <a href={profile.resumeUrl} download={profile.resumeFileName}>
                <Download /> Resume
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-line bg-white/[0.04] text-fg md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl md:hidden"
          >
            <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col px-6 pb-10 pt-28">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="flex flex-col gap-1"
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={go(item.href)}
                      className="flex items-baseline gap-4 border-b border-line py-4 text-3xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto flex flex-col gap-4">
                <Button asChild size="lg" variant="accent">
                  <a href={profile.resumeUrl} download={profile.resumeFileName}>
                    <Download /> Download Resume
                  </a>
                </Button>
                <div className="flex justify-center gap-3">
                  {profile.socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target={s.key === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-12 place-items-center rounded-full border border-line bg-white/[0.04] text-fg-muted"
                    >
                      <SocialIcon name={s.key} />
                    </a>
                  ))}
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-1 text-sm text-fg-muted"
                >
                  {profile.email} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
