// Input.tsx — text input atom. Supports error state via --color-failure token.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Shows error styling when true */
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={hasError ? "true" : undefined}
        className={cn(
          "flex w-full rounded-[var(--radius-md)] border border-[var(--color-border)]",
          "bg-[var(--color-surface)] text-[var(--color-text)]",
          "px-[var(--space-3x)] py-[var(--space-2x)]",
          "text-[var(--text-base)] leading-[var(--leading-normal)]",
          "placeholder:text-[var(--color-text-subtle)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1",
          "disabled:opacity-40 disabled:pointer-events-none",
          hasError && "border-[var(--color-failure)] focus-visible:ring-[var(--color-failure)]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
