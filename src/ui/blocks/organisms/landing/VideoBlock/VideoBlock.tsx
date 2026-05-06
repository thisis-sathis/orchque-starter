// VideoBlock.tsx — Demo video embed section. Supports YouTube, Loom, or custom poster.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface VideoBlockProps {
  heading?: string;
  subheading?: string;
  /** Full embed URL — YouTube /embed/, Loom, or Vimeo */
  embedUrl?: string;
  /** Poster image shown before play (when no embedUrl) */
  posterSrc?: string;
  posterAlt?: string;
  /** Duration shown on poster e.g. "2 min" */
  duration?: string;
  className?: string;
}

export function VideoBlock({
  heading = "See how it works",
  subheading = "Watch a 2-minute overview of the full workflow.",
  embedUrl,
  posterSrc,
  posterAlt = "Product demo video",
  duration,
  className,
}: VideoBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-8x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
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

        <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-lg)] aspect-video bg-[var(--color-surface-overlay)] relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={posterAlt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-4x)]">
              {posterSrc && (
                <img
                  src={posterSrc}
                  alt={posterAlt}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-[var(--space-3x)]">
                <button
                  className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-[var(--color-text-on-primary)] flex items-center justify-center shadow-[var(--shadow-lg)] hover:scale-105 transition-transform"
                  aria-label="Play demo video"
                >
                  <Icon name="Play" size="lg" aria-hidden="true" />
                </button>
                {duration && (
                  <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] bg-[var(--color-surface)] px-[var(--space-2x)] py-[var(--space-halfx)] rounded-full border border-[var(--color-border)]">
                    {duration}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
