// Next24HoursBlock.tsx — Timeline of what the user gets in their first 24 hours.
import React from "react";
import { Icon } from "@/ui/components/icon";
import type { IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface Hour24Step {
  time: string; // e.g. "0 min", "5 min", "1 hour"
  icon?: IconName;
  title: string;
  description: string;
}

export interface Next24HoursBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  steps: Hour24Step[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function Next24HoursBlock({ badge, heading, subheading, steps, ctaText, ctaHref, className }: Next24HoursBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
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

        {/* Timeline */}
        <ol className="relative flex flex-col gap-0" role="list">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[var(--color-border)]" aria-hidden="true" />
          {steps.map((step, i) => (
            <li key={i} className="relative pl-[var(--space-12x)] pb-[var(--space-6x)] last:pb-0">
              {/* Icon circle */}
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center z-10">
                {step.icon
                  ? <Icon name={step.icon} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                  : <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                }
              </div>

              <div className="flex flex-col gap-[var(--space-1x)]">
                <span className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)] uppercase tracking-[var(--tracking-wide)]">
                  {step.time}
                </span>
                <h3 className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {step.title}
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

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
