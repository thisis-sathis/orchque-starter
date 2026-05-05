// WallOfLovePage.tsx — social proof wall page. Grid of testimonials + optional hero heading.
// Perfect for a dedicated /love or /testimonials page.
import React from "react";
import { LandingTemplate, type LandingTheme } from "../../templates/LandingTemplate";
import { TestimonialCard, type TestimonialCardProps } from "../../blocks/molecules/TestimonialCard";
import type { NavbarBlockProps } from "../../blocks/organisms/landing/NavbarBlock";
import type { FooterBlockProps } from "../../blocks/organisms/landing/FooterBlock";
import { cn } from "../../lib/utils";

export interface WallOfLovePageProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  heading?: string;
  subheading?: string;
  testimonials: TestimonialCardProps[];
  className?: string;
}

export function WallOfLovePage({
  theme,
  navbar,
  footer,
  heading = "What our customers say",
  subheading,
  testimonials,
  className,
}: WallOfLovePageProps) {
  return (
    <LandingTemplate theme={theme} navbar={navbar} footer={footer} className={className}>
      <section className="w-full px-[var(--space-6x)] py-[var(--space-12x)]">
        <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-[var(--space-3x)]">
            <h1 className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h1>
            {subheading && (
              <p className="text-[var(--text-lg)] text-[var(--color-text-muted)] max-w-2xl">
                {subheading}
              </p>
            )}
          </div>

          {/* Masonry-like grid */}
          <div
            className={cn(
              "grid gap-[var(--space-4x)]",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
    </LandingTemplate>
  );
}
