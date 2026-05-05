// AuthTemplate.tsx - centered auth card layout (login, signup, reset).
import React from "react";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot } from "@/ui/lib/types";

export interface AuthTemplateProps {
  /** Brand name shown above the card */
  logoText?: string;
  logoSrc?: string;
  logoHref?: string;
  /** Body slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
}

export function AuthTemplate({ logoText, logoSrc, logoHref = "/", content, children, className }: AuthTemplateProps) {
  const { renderSlot } = require("@/ui/lib/render-component");
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center",
        "bg-[var(--color-surface-raised)] px-[var(--space-4x)] py-[var(--space-12x)]",
        className
      )}
    >
      {(logoText || logoSrc) && (
        <a href={logoHref} className="mb-[var(--space-8x)] font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-xl)]">
          {logoSrc ? <img src={logoSrc} alt={logoText ?? "Logo"} className="h-8 w-auto" /> : logoText}
        </a>
      )}
      <div
        className={cn(
          "w-full max-w-md",
          "bg-[var(--color-surface)] rounded-[var(--radius-xl)]",
          "border border-[var(--color-border)] shadow-[var(--shadow-lg)]",
          "p-[var(--space-8x)]"
        )}
      >
        {renderSlot(content ?? children)}
      </div>
    </div>
  );
}