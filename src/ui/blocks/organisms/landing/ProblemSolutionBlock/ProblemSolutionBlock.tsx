// ProblemSolutionBlock.tsx — Before/after: pain today → how we fix it.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface ProblemItem {
  icon?: IconName;
  label: string;
}

export interface SolutionItem {
  icon?: IconName;
  label: string;
}

export interface ProblemSolutionBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  problemHeading?: string;
  problemItems: ProblemItem[];
  solutionHeading?: string;
  solutionItems: SolutionItem[];
  className?: string;
}

export function ProblemSolutionBlock({
  badge = "The problem",
  heading = "Building SaaS is broken",
  subheading = "Founders waste weeks on setup that has nothing to do with their product.",
  problemHeading = "The old way",
  problemItems,
  solutionHeading = "The new way",
  solutionItems,
  className,
}: ProblemSolutionBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-12x)]">
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

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-6x)]">
          {/* Problem column */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-failure)]/30 bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)]">
            <p className="text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-failure)] uppercase tracking-widest">
              {problemHeading}
            </p>
            <ul className="flex flex-col gap-[var(--space-3x)]">
              {problemItems.map((item, i) => (
                <li key={i} className="flex items-start gap-[var(--space-3x)]">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-failure)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={item.icon ?? "X"}
                      size="xs"
                      className="text-[var(--color-failure)]"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution column */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-success)]/40 bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)]">
            <p className="text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-success)] uppercase tracking-widest">
              {solutionHeading}
            </p>
            <ul className="flex flex-col gap-[var(--space-3x)]">
              {solutionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-[var(--space-3x)]">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={item.icon ?? "Check"}
                      size="xs"
                      className="text-[var(--color-success)]"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[var(--text-sm)] text-[var(--color-text)] leading-[var(--leading-relaxed)]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
