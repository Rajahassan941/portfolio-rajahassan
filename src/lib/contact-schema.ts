import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form (instant feedback) and the Server Action (source of truth). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().max(254, "Email is too long.").regex(EMAIL_RE, "Please enter a valid email address."),
  subject: z.string().trim().min(3, "Please add a subject.").max(140, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — at least 20 characters.")
    .max(5000, "Message is too long (5000 characters max)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

export interface ContactState {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  errors?: ContactErrors;
}

export function validateContact(data: Record<string, unknown>) {
  const result = contactSchema.safeParse(data);
  if (result.success) return { data: result.data, errors: null };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { data: null, errors };
}
