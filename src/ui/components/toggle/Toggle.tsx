"use client";
// Toggle.tsx — on/off switch atom (Radix Switch). Active state uses --color-primary.
import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/ui/lib/utils";

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Optional visible label text */
  label?: string;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, label, id, ...props }, ref) => (
  <div className="flex items-center gap-[var(--space-2x)]">
    <SwitchPrimitive.Root
      id={id}
      ref={ref}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-[var(--radius-full)]",
        "border-2 border-transparent transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "data-[state=unchecked]:bg-[var(--color-border-strong)]",
        "data-[state=checked]:bg-[var(--color-primary)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-[var(--radius-full)]",
          "bg-white shadow-[var(--shadow-sm)] transition-transform duration-200",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-4"
        )}
      />
    </SwitchPrimitive.Root>
    {label && (
      <label
        htmlFor={id}
        className="text-[var(--text-sm)] text-[var(--color-text)] cursor-pointer select-none"
      >
        {label}
      </label>
    )}
  </div>
));

Toggle.displayName = "Toggle";
