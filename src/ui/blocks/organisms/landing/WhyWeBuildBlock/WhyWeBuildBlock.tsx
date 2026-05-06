// WhyWeBuildBlock.tsx — Left image + right founder story. "Why we built this."
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface WhyWeBuildBlockProps {
  badge?: string;
  heading?: string;
  story: string;
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function WhyWeBuildBlock({
  badge,
  heading = "Why we built this",
  story,
  highlights = [],
  imageSrc,
  imageAlt = "Founder",
  ctaText,
  ctaHref,
  className,
}: WhyWeBuildBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-[var(--space-12x)] items-center">
        {/* Left: image */}
        <div className="order-2 md:order-1">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full rounded-[var(--radius-xl)] object-cover shadow-[var(--shadow-lg)]"
            />
          ) : (
            <div className="w-full aspect-[4/3] rounded-[var(--radius-xl)] bg-[var(--color-surface-overlay)] border border-[var(--color-border)] flex items-center justify-center">
              <span className="text-[var(--text-4xl)]">👨‍💻</span>
            </div>
          )}
        </div>

        {/* Right: story */}
        <div className="order-1 md:order-2 flex flex-col gap-[var(--space-5x)]">
          {badge && (
            <span className="inline-block px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] w-fit">
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
          )}
          <p className="text-[var(--text-md)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] whitespace-pre-line">
            {story}
          </p>

          {highlights.length > 0 && (
            <ul className="flex flex-col gap-[var(--space-2x)]">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text)]">
                  <span className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="inline-flex items-center gap-[var(--space-2x)] text-[var(--color-primary)] font-[var(--font-semibold)] text-[var(--text-sm)] hover:underline w-fit"
            >
              {ctaText}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
