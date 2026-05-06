"use client";
// AnnouncementBarBlock.tsx — Top-of-page dismissible alert / notification banner.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface AnnouncementBarBlockProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  variant?: "info" | "success" | "warning";
  dismissible?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  info:    "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
  success: "bg-[var(--color-success)] text-white",
  warning: "bg-[var(--color-highlight)] text-[var(--color-text)]",
};

export function AnnouncementBarBlock({
  message,
  linkText,
  linkHref,
  variant = "info",
  dismissible = true,
  className,
}: AnnouncementBarBlockProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "w-full py-[var(--space-2x)] px-[var(--space-6x)] flex items-center justify-center gap-[var(--space-3x)] text-[var(--text-sm)] font-[var(--font-medium)]",
        variantStyles[variant],
        className
      )}
    >
      <Icon name="Megaphone" size="sm" aria-hidden="true" className="flex-shrink-0" />
      <span className="flex-1 text-center">
        {message}
        {linkText && linkHref && (
          <a
            href={linkHref}
            className="ml-[var(--space-2x)] underline underline-offset-2 font-[var(--font-semibold)] hover:opacity-80 transition-opacity"
          >
            {linkText} →
          </a>
        )}
      </span>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
        >
          <Icon name="X" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
