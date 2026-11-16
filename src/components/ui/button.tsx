import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui-style button, re-themed for the portfolio. */
const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background,color,box-shadow,border-color,transform] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(79_124_255/0.55)] hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_40px_-4px_rgb(79_124_255/0.8)]",
        accent:
          "text-white bg-[linear-gradient(110deg,var(--color-blue),var(--color-violet))] shadow-[0_8px_30px_-6px_rgb(139_92_246/0.6)] hover:shadow-[0_10px_44px_-4px_rgb(139_92_246/0.85)]",
        outline:
          "glass text-fg hover:border-line-strong hover:bg-white/[0.07]",
        ghost: "text-fg-muted hover:bg-white/[0.06] hover:text-fg",
        icon: "glass text-fg-muted hover:text-fg hover:border-line-strong",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
