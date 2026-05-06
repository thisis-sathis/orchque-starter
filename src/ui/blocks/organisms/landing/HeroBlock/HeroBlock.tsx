// HeroBlock.tsx — main landing hero section organism. All copy data-driven from config.
import React from "react";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface HeroBlockProps {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** Optional badge/eyebrow text above headline */
  badge?: string;
  /** Optional hero image URL */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function HeroBlock({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  badge,
  imageSrc,
  imageAlt,
  className,
}: HeroBlockProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "bg-[var(--landing-hero-bg,var(--color-surface))]",
        "px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        "md:py-[calc(var(--space-12x)*2)]",
        className
      )}
      aria-labelledby="hero-headline"
    >
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-[var(--space-6x)]">
        {badge && (
          <div
            className="inline-flex items-center rounded-[var(--radius-full)] px-[var(--space-3x)] py-[var(--space-1x)]
              text-[var(--text-xs)] font-[var(--font-medium)]
              bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]
              text-[var(--color-primary)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
          >
            {badge}
          </div>
        )}

        <h1
          id="hero-headline"
          className="text-[var(--text-5xl)] font-[var(--font-bold)] text-[var(--color-text)]
            leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]
            md:text-[var(--text-6xl)] lg:text-[var(--text-7xl)]"
        >
          {headline}
        </h1>

        {subheadline && (
          <p className="max-w-2xl text-[var(--text-lg)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
            {subheadline}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-[var(--space-3x)]">
          <Button size="lg" asChild>
            <a href={ctaHref}>{ctaText}</a>
          </Button>
          {secondaryCtaText && secondaryCtaHref && (
            <Button variant="ghost" size="lg" asChild>
              <a href={secondaryCtaHref}>{secondaryCtaText}</a>
            </Button>
          )}
        </div>

        {imageSrc && (
          <div className="w-full mt-[var(--space-8x)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)] border border-[var(--color-border)]">
            <img
              src={imageSrc}
              alt={imageAlt ?? "Product screenshot"}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
