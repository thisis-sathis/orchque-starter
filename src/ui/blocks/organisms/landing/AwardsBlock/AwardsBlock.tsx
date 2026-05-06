// AwardsBlock.tsx — Awards, certifications, and recognition badges.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";
import type { IconName } from "@/ui/components/icon";

export interface Award {
  icon?: IconName;
  badgeSrc?: string;
  title: string;
  issuer: string;
  year?: string;
}

export interface AwardsBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  awards: Award[];
  className?: string;
}

export function AwardsBlock({
  badge,
  heading,
  subheading,
  awards,
  className,
}: AwardsBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)] max-w-xl mx-auto">
          {badge && (
            <span className="inline-flex w-fit mx-auto items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              {badge}
            </span>
          )}
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[var(--space-5x)]">
          {awards.map((award) => (
            <div
              key={award.title}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5x)] flex flex-col items-center gap-[var(--space-3x)] text-center hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)] transition-all"
            >
              {award.badgeSrc ? (
                <img src={award.badgeSrc} alt={award.title} className="h-14 w-auto object-contain" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[var(--color-highlight)]/15 flex items-center justify-center">
                  <Icon
                    name={award.icon ?? "Trophy"}
                    size="lg"
                    className="text-[var(--color-highlight)]"
                    aria-hidden="true"
                  />
                </div>
              )}
              <div>
                <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {award.title}
                </p>
                <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{award.issuer}</p>
                {award.year && (
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-1x)]">
                    {award.year}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
