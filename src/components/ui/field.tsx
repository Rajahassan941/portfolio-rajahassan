import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border bg-white/[0.025] px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-[border-color,background,box-shadow] duration-200 outline-none hover:border-line-strong focus:border-blue/70 focus:bg-white/[0.04] focus:shadow-[0_0_0_4px_rgb(79_124_255/0.15)] disabled:opacity-60 aria-[invalid=true]:border-danger/70 aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(248_113_113/0.15)]";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, "h-12 border-line", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-36 resize-y border-line py-3", className)} {...props} />;
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-sm font-medium text-fg-muted", className)} {...props} />;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className="mt-1.5 min-h-5 text-xs text-danger">
      {message}
    </p>
  );
}
