// Button.tsx — base button atom. CVA-based variants, all colors from CSS token vars.
// Rule: never hardcode colors here — everything via var(--color-*).
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/ui/lib/utils";

const buttonVariants = cva(
  // Base styles — applied to all variants
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "rounded-[var(--radius-md)]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
          "hover:opacity-90 active:opacity-80",
          "shadow-[var(--shadow-sm)]",
        ],
        secondary: [
          "bg-[var(--color-surface-raised)] text-[var(--color-text)]",
          "border border-[var(--color-border)]",
          "hover:bg-[var(--color-surface-overlay)] active:opacity-80",
        ],
        ghost: [
          "bg-transparent text-[var(--color-text)]",
          "hover:bg-[var(--color-surface-raised)] active:opacity-80",
        ],
        danger: [
          "bg-[var(--color-failure)] text-white",
          "hover:opacity-90 active:opacity-80",
        ],
        link: [
          "bg-transparent text-[var(--color-primary)] underline-offset-4",
          "hover:underline p-0 h-auto",
        ],
        outline: [
          "bg-transparent text-[var(--color-primary)]",
          "border border-[var(--color-primary)]",
          "hover:bg-[var(--color-primary)] hover:text-[var(--color-text-on-primary)]",
          "active:opacity-80",
        ],
      },
      size: {
        xs: "h-6 px-2 text-[var(--text-xs)]",
        sm: "h-8 px-3 text-[var(--text-sm)]",
        md: "h-9 px-4 text-[var(--text-base)]",
        lg: "h-11 px-6 text-[var(--text-md)]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** If true, renders as child element (Radix Slot) — useful for Link wrappers */
  asChild?: boolean;
  /**
   * Data-driven text label.
   * Use this instead of children when building from JSON config.
   * Falls back to children for backward-compat (e.g. asChild Link wrappers).
   */
  label?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, label, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {label !== undefined ? label : children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
