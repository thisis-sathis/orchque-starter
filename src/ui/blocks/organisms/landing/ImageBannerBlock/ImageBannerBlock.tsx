// ImageBannerBlock.tsx — Full-width image background with centered title, subtitle, and CTA.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface ImageBannerBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** Path to background image; falls back to gradient if omitted */
  imageSrc?: string;
  /** Overlay darkness 0-100 (default 55) */
  overlayOpacity?: number;
  /** Minimum section height in px (default 480) */
  minHeight?: number;
  className?: string;
}

export function ImageBannerBlock({
  badge,
  heading,
  subheading,
  ctaText,
  ctaHref = "#",
  secondaryCtaText,
  secondaryCtaHref = "#",
  imageSrc,
  overlayOpacity = 55,
  minHeight = 480,
  className,
}: ImageBannerBlockProps) {
  return (
    <section
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden",
        "px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
      style={{ minHeight }}
    >
      {/* Background image or gradient */}
      {imageSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {badge}
          </span>
        )}

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
          {heading}
        </h2>

        {subheading && (
          <p className="text-lg text-white/80 max-w-xl leading-relaxed drop-shadow-sm">
            {subheading}
          </p>
        )}

        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            {ctaText && (
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[var(--color-primary)] hover:bg-white/90 transition-colors shadow-lg"
              >
                {ctaText}
                <Icon name="ArrowRight" size="xs" />
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
