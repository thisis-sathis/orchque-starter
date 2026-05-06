// HowItWorksBlock.tsx — Numbered step-by-step flow: Define → Build → Launch.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface WorkStep {
  step: number;
  icon?: IconName;
  title: string;
  description: string;
}

export interface HowItWorksBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  steps: WorkStep[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function HowItWorksBlock({
  badge = "How it works",
  heading = "From idea to live product — in minutes",
  subheading,
  steps,
  ctaText,
  ctaHref,
  className,
}: HowItWorksBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-12x)]">
        {/* Header */}
        <div className="flex flex-col items-center gap-[var(--space-3x)] text-center">
          {badge && (
            <span className="px-[var(--space-3x)] py-[var(--space-1x)] rounded-full border border-[var(--color-border)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="max-w-xl text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Steps */}
        <ol className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-[var(--space-5x)] relative">
              {/* Vertical connector line (not on last item) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-5 top-10 w-px bg-[var(--color-border)] z-0"
                  style={{ height: "calc(100% - 2.5rem)" }}
                />
              )}

              {/* Step number circle */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface)] flex items-center justify-center">
                {step.icon ? (
                  <Icon name={step.icon} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                ) : (
                  <span className="text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-primary)]">
                    {step.step}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="pb-[var(--space-8x)] flex flex-col gap-[var(--space-1x)]">
                <p className="text-[var(--text-base)] font-[var(--font-bold)] text-[var(--color-text)]">
                  {step.title}
                </p>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Optional CTA */}
        {ctaText && ctaHref && (
          <div className="flex justify-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-[var(--space-2x)] px-[var(--space-6x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-[var(--font-semibold)] hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              {ctaText}
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
