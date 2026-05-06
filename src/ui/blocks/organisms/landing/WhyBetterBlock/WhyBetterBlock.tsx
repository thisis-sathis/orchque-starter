// WhyBetterBlock.tsx — "How we're better" — image left, title + subtitle + checklist + CTA right.
// Works for a11y, SEO, security, performance — any pillar-based pitch.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";
import type { IconName } from "@/ui/components/icon";

export interface WhyBetterPoint {
  icon?: IconName;
  title: string;
  description?: string;
}

export interface WhyBetterBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  imageSrc?: string;
  imageAlt?: string;
  points: WhyBetterPoint[];
  ctaText?: string;
  ctaHref?: string;
  /** Flip to put image on the right */
  imageRight?: boolean;
  className?: string;
}

export function WhyBetterBlock({
  badge,
  heading,
  subheading,
  imageSrc,
  imageAlt = "",
  points,
  ctaText,
  ctaHref,
  imageRight = false,
  className,
}: WhyBetterBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-[var(--space-12x)] items-center",
          imageRight && "md:[&>*:first-child]:order-2"
        )}
      >
        {/* Image side */}
        <div className="rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] aspect-[4/3] flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-[var(--space-3x)] p-[var(--space-8x)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Icon name="Image" size="lg" className="text-[var(--color-primary)]" aria-hidden="true" />
              </div>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">Add your screenshot here</p>
            </div>
          )}
        </div>

        {/* Content side */}
        <div className="flex flex-col gap-[var(--space-6x)]">
          {badge && (
            <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              {badge}
            </span>
          )}
          <div className="flex flex-col gap-[var(--space-2x)]">
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                {subheading}
              </p>
            )}
          </div>

          <ul className="flex flex-col gap-[var(--space-4x)]" role="list">
            {points.map((point, i) => (
              <li key={i} className="flex gap-[var(--space-3x)] items-start">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon
                    name={point.icon ?? "CheckCircle2"}
                    size="sm"
                    className="text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    {point.title}
                  </p>
                  {point.description && (
                    <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                      {point.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {ctaText && ctaHref && (
            <div>
              <Button asChild>
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
