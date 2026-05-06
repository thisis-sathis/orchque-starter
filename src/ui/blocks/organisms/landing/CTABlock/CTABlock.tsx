// CTABlock.tsx — bottom call-to-action section organism.
import React from "react";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface CTABlockProps {
  heading: string;
  subheading?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export function CTABlock({ heading, subheading, ctaText, ctaHref, secondaryCtaText, secondaryCtaHref, className }: CTABlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        "bg-[var(--color-primary)] text-[var(--color-text-on-primary)]",
        className
      )}
    >
      <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-[var(--space-6x)]">
        <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)]">{heading}</h2>
        {subheading && (
          <p className="text-[var(--text-md)] opacity-80">{subheading}</p>
        )}
        <div className="flex flex-wrap justify-center gap-[var(--space-3x)]">
          <Button
            variant="secondary"
            size="lg"
            asChild
          >
            <a href={ctaHref}>{ctaText}</a>
          </Button>
          {secondaryCtaText && secondaryCtaHref && (
            <Button
              variant="ghost"
              size="lg"
              className="text-[var(--color-text-on-primary)] border-[var(--color-text-on-primary)] hover:bg-[var(--color-text-on-primary)]/10"
              asChild
            >
              <a href={secondaryCtaHref}>{secondaryCtaText}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
