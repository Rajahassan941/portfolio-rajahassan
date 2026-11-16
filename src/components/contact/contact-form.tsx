"use client";

import { useActionState, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import {
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  type ContactState,
} from "@/lib/contact-schema";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };
const INITIAL: ContactState = { status: "idle" };

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Wrap the Server Action so we can react to its result (reset / mailto hand-off) without effects.
  const [state, formAction, pending] = useActionState(async (prev: ContactState, formData: FormData) => {
    const result = await sendContactMessage(prev, formData);
    if (result.status === "success") {
      setValues(EMPTY);
      setTouched({});
      setClientErrors({});
    } else if (result.status === "fallback") {
      const get = (k: ContactField) => String(formData.get(k) ?? "");
      const body = `${get("message")}\n\n— ${get("name")} (${get("email")})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`;
    }
    return result;
  }, INITIAL);

  const errors: ContactErrors = { ...(state.status === "error" ? state.errors : {}), ...clientErrors };

  const update = (field: ContactField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) {
      const { errors: errs } = validateContact(next);
      setClientErrors((prev) => ({ ...prev, [field]: errs?.[field] }));
    }
  };

  const blur = (field: ContactField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const { errors: errs } = validateContact(values);
    setClientErrors((prev) => ({ ...prev, [field]: errs?.[field] }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { errors: errs } = validateContact(values);
    if (errs) {
      e.preventDefault();
      setClientErrors(errs);
      setTouched({ name: true, email: true, subject: true, message: true });
      const first = (Object.keys(errs) as ContactField[])[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    } else {
      setClientErrors({});
    }
  };

  const field = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    "aria-invalid": Boolean(errors[name]) || undefined,
    "aria-describedby": `contact-${name}-error`,
    disabled: pending,
  });

  const showBanner = state.status !== "idle" && !(state.status === "error" && state.errors && !state.message);

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="relative" aria-describedby="contact-status">
      {/* Honeypot (hidden from humans and assistive tech) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input {...field("name")} autoComplete="name" placeholder="Jane Doe" required minLength={2} maxLength={80} />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input {...field("email")} type="email" autoComplete="email" inputMode="email" placeholder="jane@company.com" required maxLength={254} />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-subject">Subject</Label>
        <Input {...field("subject")} placeholder="Senior Frontend role at …" required minLength={3} maxLength={140} />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <Label htmlFor="contact-message">Message</Label>
          <span className={cn("text-xs tabular-nums", values.message.length > 5000 ? "text-danger" : "text-fg-subtle")}>
            {values.message.length}/5000
          </span>
        </div>
        <Textarea {...field("message")} rows={6} placeholder="Tell me a little about the opportunity or idea…" required minLength={20} maxLength={5000} data-lenis-prevent />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">I typically reply within a couple of days.</p>
        <Button type="submit" variant="accent" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>

      <div id="contact-status" role="status" aria-live="polite" className="mt-5">
        <AnimatePresence mode="wait">
          {showBanner && state.message && (
            <motion.div
              key={state.status + state.message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
                state.status === "success" && "border-success/30 bg-success/10 text-emerald-100",
                state.status === "error" && "border-danger/30 bg-danger/10 text-red-100",
                state.status === "fallback" && "border-blue/30 bg-blue/10 text-blue-100",
              )}
            >
              {state.status === "success" ? (
                <CircleCheck size={18} className="mt-px shrink-0" aria-hidden="true" />
              ) : (
                <CircleAlert size={18} className="mt-px shrink-0" aria-hidden="true" />
              )}
              <span>
                {state.message}
                {state.status === "fallback" && (
                  <>
                    {" "}
                    If nothing opened, email{" "}
                    <a className="underline underline-offset-2" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </>
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
