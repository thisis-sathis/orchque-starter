// Badge.tsx — status/label badge atom. CVA variants using token colors.
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] px-[var(--space-2x)] py-[var(--space-halfx)] text-[var(--text-xs)] font-[var(--font-semibold)] whitespace-nowrap",
  {
    variants: {
      variant: {
        default:  "bg-[var(--color-surface-overlay)] text-[var(--color-text)]",
        primary:  "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
        success:  "bg-[var(--color-success-surface)] text-[var(--color-success)]",
        warning:  "bg-[var(--color-warning-surface)] text-[var(--color-warning)]",
        danger:   "bg-[var(--color-failure-surface)] text-[var(--color-failure)]",
        outline:  "border border-[var(--color-border)] text-[var(--color-text-muted)] bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  /** Text label — replaces ReactNode children for data-driven usage */
  label: string;
  className?: string;
}

export { badgeVariants };

export function Badge({ className, variant, label }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{label}</span>;
}
