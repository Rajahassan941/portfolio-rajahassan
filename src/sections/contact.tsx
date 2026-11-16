import { ArrowUpRight, Download } from "lucide-react";
import { contactSection } from "@/data/content";
import { profile } from "@/data/profile";
import { SECTION_IDS } from "@/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/icons/brand-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { isPlaceholder } from "@/lib/utils";

export function Contact() {
  return (
    <section id={SECTION_IDS.contact} aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(ellipse,rgb(79_124_255/0.2),rgb(139_92_246/0.1)_40%,transparent_70%)] blur-3xl" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
      </div>

      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow={contactSection.eyebrow}
              title={contactSection.heading}
              description={
                <>
                  {contactSection.paragraphs.map((p, i) => (
                    <span key={i} className={i > 0 ? "mt-4 block" : "block"}>
                      {p}
                    </span>
                  ))}
                </>
              }
            />

            <RevealGroup className="mt-10 flex flex-col gap-3" stagger={0.08}>
              {profile.socials.map((s) => (
                <RevealItem key={s.key}>
                  <a
                    href={s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-[border-color,background,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/[0.04]"
                  >
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg text-fg-muted transition-[color,box-shadow] duration-300 group-hover:text-fg group-hover:shadow-[0_0_24px_-6px_rgb(79_124_255/0.8)]">
                      <SocialIcon name={s.key} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">{s.label}</span>
                      <span className="block truncate text-sm text-fg-muted">
                        {s.handle}
                        {isPlaceholder(s.href) && (
                          <span className="ml-2 rounded border border-dashed border-warn/40 px-1 text-[0.65rem] text-warn/80">
                            placeholder
                          </span>
                        )}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-fg-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      aria-hidden="true"
                    />
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-8">
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <a href={profile.resumeUrl} download={profile.resumeFileName}>
                    <Download /> Download Resume
                  </a>
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-gradient relative rounded-[1.75rem] bg-[linear-gradient(180deg,rgb(255_255_255/0.045),rgb(255_255_255/0.012))] p-6 shadow-[0_40px_120px_-40px_rgb(79_124_255/0.35)] backdrop-blur-xl sm:p-9">
              <h3 className="text-xl font-semibold tracking-tight">Send a message</h3>
              <p className="mb-7 mt-1.5 text-sm text-fg-muted">All fields are required.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
