// TryWithoutSignupBlock.tsx — Conversion section: try for free, no account needed.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface TryWithoutSignupBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trust?: string[];
  className?: string;
}

export function TryWithoutSignupBlock({
  badge = "No commitment",
  heading = "Try it before you sign up",
  subheading = "No credit card. No account. Just paste your idea and see what ships.",
  ctaText = "Try it free — no account needed",
  ctaHref = "/try",
  secondaryCtaText = "See how it works",
  secondaryCtaHref = "/#demo",
  trust = ["No sign-up required", "No credit card", "Your data stays private"],
  className,
}: TryWithoutSignupBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-3xl flex flex-col items-center gap-[var(--space-8x)] text-center">
        {badge && (
          <span className="inline-block px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
            {badge}
          </span>
        )}

        <div className="flex flex-col gap-[var(--space-3x)]">
          <h2 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
          <p className="text-[var(--text-lg)] text-[var(--color-text-muted)]">{subheading}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-[var(--space-3x)]">
          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center px-[var(--space-8x)] py-[var(--space-4x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] hover:bg-[var(--color-primary)]/90 transition-colors shadow-[var(--shadow-md)]"
            >
              {ctaText}
            </a>
          )}
          {secondaryCtaText && secondaryCtaHref && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center px-[var(--space-8x)] py-[var(--space-4x)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-[var(--font-semibold)] text-[var(--text-md)] hover:border-[var(--color-primary)]/60 transition-colors"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>

        {trust.length > 0 && (
          <div className="flex flex-wrap justify-center gap-[var(--space-4x)]">
            {trust.map((t, i) => (
              <span key={i} className="flex items-center gap-[var(--space-1x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
                <span className="text-[var(--color-success)]" aria-hidden="true">✓</span>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
