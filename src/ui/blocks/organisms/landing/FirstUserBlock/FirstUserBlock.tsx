// FirstUserBlock.tsx — First user / early adopter spotlight with photo + case study.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface FirstUserBlockProps {
  badge?: string;
  heading?: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImageSrc?: string;
  metric?: string;
  metricLabel?: string;
  company?: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
  className?: string;
}

export function FirstUserBlock({
  badge = "First success story",
  heading,
  quote,
  authorName,
  authorRole,
  authorImageSrc,
  metric,
  metricLabel,
  company,
  caseStudyHref,
  caseStudyLabel = "Read the full case study",
  className,
}: FirstUserBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-[var(--shadow-lg)]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            {/* Left: quote + author */}
            <div className="p-[var(--space-10x)] flex flex-col justify-between gap-[var(--space-8x)]">
              {badge && (
                <span className="inline-block px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)] w-fit">
                  {badge}
                </span>
              )}

              {heading && (
                <h2 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                  {heading}
                </h2>
              )}

              <blockquote className="flex flex-col gap-[var(--space-6x)]">
                <p className="text-[var(--text-xl)] text-[var(--color-text)] leading-[var(--leading-relaxed)] font-[var(--font-medium)] before:content-['\u201c'] after:content-['\u201d']">
                  {quote}
                </p>
                <footer className="flex items-center gap-[var(--space-3x)]">
                  {authorImageSrc ? (
                    <img
                      src={authorImageSrc}
                      alt={authorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--text-xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                      {authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)]">{authorName}</p>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{authorRole}{company ? `, ${company}` : ""}</p>
                  </div>
                </footer>
              </blockquote>

              {caseStudyHref && (
                <a
                  href={caseStudyHref}
                  className="inline-flex items-center gap-[var(--space-2x)] text-[var(--color-primary)] font-[var(--font-semibold)] text-[var(--text-sm)] hover:underline w-fit"
                >
                  {caseStudyLabel}
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>

            {/* Right: metric */}
            {(metric || metricLabel) && (
              <div className="bg-[var(--color-primary)] text-[var(--color-text-on-primary)] p-[var(--space-10x)] flex flex-col items-center justify-center gap-[var(--space-2x)] text-center">
                {metric && (
                  <p className="text-[var(--text-5xl)] font-[var(--font-bold)] leading-none">{metric}</p>
                )}
                {metricLabel && (
                  <p className="text-[var(--text-md)] opacity-80">{metricLabel}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
