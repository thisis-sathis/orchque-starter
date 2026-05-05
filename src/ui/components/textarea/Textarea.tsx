// Textarea.tsx — multi-line text input atom. Same styling contract as Input.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={hasError ? "true" : undefined}
        className={cn(
          "flex w-full min-h-[80px] rounded-[var(--radius-md)] border border-[var(--color-border)]",
          "bg-[var(--color-surface)] text-[var(--color-text)]",
          "px-[var(--space-3x)] py-[var(--space-2x)]",
          "text-[var(--text-base)] leading-[var(--leading-normal)]",
          "placeholder:text-[var(--color-text-subtle)]",
          "resize-y transition-colors duration-150",
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

Textarea.displayName = "Textarea";
