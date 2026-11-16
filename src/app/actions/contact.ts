"use server";

import { validateContact, type ContactState } from "@/lib/contact-schema";

/**
 * Contact form Server Action.
 *
 * Delivery uses Resend's HTTP API (no SDK needed). Configure in `.env.local`:
 *   RESEND_API_KEY=re_xxx
 *   CONTACT_TO_EMAIL=you@yourdomain.com
 *   CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"   # must be a verified Resend sender
 *
 * Without configuration the action still validates, then returns `fallback`
 * so the client can hand off to the visitor's email app instead.
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const { data, errors } = validateContact({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!data) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return {
      status: "fallback",
      message: "Direct sending isn't configured yet — opening your email app with the message prefilled.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "Something went wrong sending your message. Please try email instead." };
    }

    return { status: "success", message: "Thanks! Your message has been sent — I'll get back to you soon." };
  } catch (err) {
    console.error("[contact] Network error", err);
    return { status: "error", message: "Couldn't reach the mail service. Please try again or email me directly." };
  }
}
