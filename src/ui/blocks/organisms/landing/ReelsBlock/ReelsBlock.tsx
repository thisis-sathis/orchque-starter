// ReelsBlock.tsx — Horizontal scroll of video reel cards (short-form video collection).
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface Reel {
  title: string;
  duration?: string;
  thumbnailSrc?: string;
  href?: string;
  tag?: string;
}

export interface ReelsBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  reels: Reel[];
  className?: string;
}

export function ReelsBlock({ badge, heading, subheading, reels, className }: ReelsBlockProps) {
  return (
    <section className={cn("w-full py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-7xl flex flex-col gap-[var(--space-8x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)] px-[var(--landing-section-px)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                {badge}
              </span>
            )}
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

        {/* Scroll row */}
        <div
          className="flex gap-[var(--space-4x)] overflow-x-auto pb-[var(--space-3x)] snap-x snap-mandatory scrollbar-hide px-[var(--landing-section-px)]"
          role="list"
        >
          {reels.map((reel, i) => (
            <a
              key={i}
              href={reel.href ?? "#"}
              role="listitem"
              className="snap-start flex-shrink-0 w-44 sm:w-52 group focus:outline-none"
            >
              <div className="relative rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-raised)] aspect-[9/16] shadow-[var(--shadow-sm)] group-hover:shadow-[var(--shadow-md)] transition-shadow">
                {reel.thumbnailSrc ? (
                  <img src={reel.thumbnailSrc} alt={reel.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow">
                      <Icon name="Play" size="md" className="text-[var(--color-primary)] ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

                {/* Duration badge */}
                {reel.duration && (
                  <span className="absolute top-[var(--space-2x)] right-[var(--space-2x)] bg-black/60 text-white text-[var(--text-xs)] px-[var(--space-2x)] py-[var(--space-halfx)] rounded-full">
                    {reel.duration}
                  </span>
                )}

                {/* Play button overlay */}
                {reel.thumbnailSrc && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Icon name="Play" size="md" className="text-[var(--color-primary)] ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-[var(--space-2x)] flex flex-col gap-[var(--space-1x)]">
                {reel.tag && (
                  <span className="text-[var(--text-xs)] text-[var(--color-primary)] font-[var(--font-medium)]">{reel.tag}</span>
                )}
                <p className="text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-text)] line-clamp-2 leading-[var(--leading-snug)]">
                  {reel.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
