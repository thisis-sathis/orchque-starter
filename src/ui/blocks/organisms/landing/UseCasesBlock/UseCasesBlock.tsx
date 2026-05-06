// UseCasesBlock.tsx — "Who it's for" — self-identification cards.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface UseCase {
  icon?: IconName;
  audience: string;
  tagline: string;
  bullets: string[];
}

export interface UseCasesBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  cases: UseCase[];
  className?: string;
}

export function UseCasesBlock({
  badge = "Who it's for",
  heading = "Built for builders like you",
  subheading,
  cases,
  className,
}: UseCasesBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
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

        {/* Cards */}
        <div className="grid gap-[var(--space-5x)] sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md)] transition-all"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Icon
                  name={c.icon ?? "User"}
                  size="sm"
                  className="text-[var(--color-primary)]"
                  aria-hidden="true"
                />
              </div>

              {/* Audience + tagline */}
              <div>
                <p className="text-[var(--text-base)] font-[var(--font-bold)] text-[var(--color-text)]">
                  {c.audience}
                </p>
                <p className="text-[var(--text-sm)] text-[var(--color-primary)] font-[var(--font-semibold)] mt-[var(--space-halfx)]">
                  {c.tagline}
                </p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-[var(--space-2x)]">
                {c.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
                    <Icon name="Check" size="xs" className="text-[var(--color-success)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
