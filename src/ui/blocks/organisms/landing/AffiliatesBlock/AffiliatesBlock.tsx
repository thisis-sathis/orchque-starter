// AffiliatesBlock.tsx — Affiliate/referral program CTA section.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface AffiliatePerk {
  icon?: string;
  title: string;
  description: string;
}

export interface AffiliatesBlockProps {
  heading?: string;
  subheading?: string;
  commission?: string;
  ctaText?: string;
  ctaHref?: string;
  perks?: AffiliatePerk[];
  className?: string;
}

export function AffiliatesBlock({
  heading = "Earn by sharing",
  subheading = "Join our affiliate program and earn commission for every paying customer you refer.",
  commission = "30%",
  ctaText = "Become an affiliate",
  ctaHref = "/affiliates",
  perks = [],
  className,
}: AffiliatesBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
        <div className="flex flex-col md:flex-row gap-[var(--space-10x)] items-center">
          {/* Left */}
          <div className="flex flex-col gap-[var(--space-5x)] flex-1">
            {commission && (
              <div className="inline-flex">
                <span className="text-[var(--text-5xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                  {commission}
                </span>
                <span className="ml-[var(--space-2x)] text-[var(--text-xl)] text-[var(--color-text-muted)] self-end pb-2">
                  commission
                </span>
              </div>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                {subheading}
              </p>
            )}
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center gap-[var(--space-2x)] px-[var(--space-5x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-[var(--font-semibold)] hover:bg-[var(--color-primary)]/90 transition-colors w-fit"
              >
                {ctaText}
                <Icon name="ArrowRight" size="sm" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Right: perks */}
          {perks.length > 0 && (
            <div className="flex-1 flex flex-col gap-[var(--space-4x)]">
              {perks.map((p, i) => (
                <div key={i} className="flex items-start gap-[var(--space-3x)]">
                  <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-surface-overlay)] flex items-center justify-center flex-shrink-0">
                    <Icon name={(p.icon as any) ?? "Star"} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">{p.title}</p>
                    <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
