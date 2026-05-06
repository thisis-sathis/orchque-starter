// CommonMistakesBlock.tsx — Mistakes other builders make + how this fixes them.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface Mistake {
  mistake: string;
  fix: string;
}

export interface CommonMistakesBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  mistakes: Mistake[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function CommonMistakesBlock({ badge, heading, subheading, mistakes, ctaText, ctaHref, className }: CommonMistakesBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        {/* Mistakes table */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-2 bg-[var(--color-surface-overlay)]">
            <div className="p-[var(--space-4x)] border-r border-[var(--color-border)]">
              <span className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-error)]">
                ✕ Common mistake
              </span>
            </div>
            <div className="p-[var(--space-4x)]">
              <span className="text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] text-[var(--color-success)]">
                ✓ Better way
              </span>
            </div>
          </div>

          {mistakes.map((row, i) => (
            <div
              key={i}
              className={cn(
                "grid grid-cols-2 border-t border-[var(--color-border)]",
                i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-raised)]"
              )}
            >
              <div className="p-[var(--space-4x)] border-r border-[var(--color-border)] flex items-start gap-[var(--space-2x)]">
                <span className="text-[var(--color-error)] flex-shrink-0 mt-0.5" aria-hidden="true">✕</span>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{row.mistake}</p>
              </div>
              <div className="p-[var(--space-4x)] flex items-start gap-[var(--space-2x)]">
                <span className="text-[var(--color-success)] flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                <p className="text-[var(--text-sm)] text-[var(--color-text)]">{row.fix}</p>
              </div>
            </div>
          ))}
        </div>

        {ctaText && ctaHref && (
          <div className="text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center px-[var(--space-6x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
