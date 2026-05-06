// FeaturedOnBlock.tsx — "As seen in / Featured on" press logo strip.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface PressMention {
  name: string;
  logoSrc?: string;
  href?: string;
}

export interface FeaturedOnBlockProps {
  heading?: string;
  mentions: PressMention[];
  className?: string;
}

export function FeaturedOnBlock({
  heading = "Featured on",
  mentions,
  className,
}: FeaturedOnBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] border-y border-[var(--color-border)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-[var(--space-6x)]">
        {heading && (
          <p className="text-[var(--text-xs)] font-[var(--font-semibold)] tracking-[var(--tracking-wide)] uppercase text-[var(--color-text-muted)]">
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-[var(--space-8x)]">
          {mentions.map((m, i) => {
            const Inner = m.logoSrc ? (
              <img
                src={m.logoSrc}
                alt={m.name}
                className="h-7 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            ) : (
              <span className="text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors tracking-tight">
                {m.name}
              </span>
            );

            return m.href ? (
              <a key={i} href={m.href} target="_blank" rel="noopener noreferrer" aria-label={m.name}>
                {Inner}
              </a>
            ) : (
              <div key={i}>{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
