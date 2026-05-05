// Label.tsx — form label atom. Radix Label primitive with optional required indicator.
import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/ui/lib/utils";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Shows a red asterisk (*) when true */
  required?: boolean;
  /** Data-driven text label. Falls back to children for backward-compat. */
  label?: string;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, label, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-text)]",
      "leading-[var(--leading-tight)] select-none",
      "peer-disabled:opacity-40 peer-disabled:pointer-events-none",
      className
    )}
    {...props}
  >
    {label ?? children}
    {required && (
      <span className="ml-1 text-[var(--color-failure)]" aria-hidden="true">*</span>
    )}
  </LabelPrimitive.Root>
));

Label.displayName = "Label";
