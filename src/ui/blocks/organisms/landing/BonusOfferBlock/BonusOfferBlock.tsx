// BonusOfferBlock.tsx — Value-stacking bonus block.
// Shows a list of bonuses with individual values, total value, and CTA price.
import React from "react";
import { Icon } from "@/ui/components/icon";
import type { IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface BonusItem {
  icon?: IconName;
  title: string;
  description?: string;
  value: string;         // e.g. "$97 value"
}

export interface BonusOfferBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  bonuses: BonusItem[];
  totalValue: string;    // e.g. "$497 total value"
  offerPrice: string;    // e.g. "yours for just $49"
  ctaText: string;
  ctaHref: string;
  urgencyNote?: string;  // e.g. "Bonus #3 expires in 48 hours"
  className?: string;
}

export function BonusOfferBlock({
  badge = "Limited-time bonus",
  heading,
  subheading,
  bonuses,
  totalValue,
  offerPrice,
  ctaText,
  ctaHref,
  urgencyNote,
  className,
}: BonusOfferBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-8x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          {badge && (
            <span className="inline-flex w-fit mx-auto items-center gap-1 rounded-full bg-[var(--color-highlight)]/20 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">
              🎁 {badge}
            </span>
          )}
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Bonus list */}
        <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-[var(--shadow-lg)]">
          {bonuses.map((b, i) => (
            <div
              key={b.title}
              className={cn(
                "flex items-start gap-[var(--space-4x)] p-[var(--space-5x)]",
                i !== 0 && "border-t border-[var(--color-border)]"
              )}
            >
              {/* Bonus number */}
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--text-xs)] font-[var(--font-bold)] text-[var(--color-primary)] flex-shrink-0">
                {i + 1}
              </div>

              {/* Icon */}
              {b.icon && (
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                  <Icon name={b.icon} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col gap-[var(--space-1x)]">
                <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {b.title}
                </p>
                {b.description && (
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{b.description}</p>
                )}
              </div>

              {/* Value */}
              <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-success)] whitespace-nowrap flex-shrink-0">
                {b.value}
              </span>
            </div>
          ))}

          {/* Total row */}
          <div className="flex items-center justify-between bg-[var(--color-surface-raised)] border-t-2 border-[var(--color-primary)]/30 px-[var(--space-5x)] py-[var(--space-4x)]">
            <span className="text-[var(--text-md)] font-[var(--font-bold)] text-[var(--color-text)]">
              Total value
            </span>
            <span className="text-[var(--text-xl)] font-[var(--font-bold)] text-[var(--color-text)] line-through opacity-60">
              {totalValue}
            </span>
          </div>
        </div>

        {/* Offer price + CTA */}
        <div className="text-center flex flex-col gap-[var(--space-4x)]">
          <p className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">
            Get everything — <span className="text-[var(--color-primary)]">{offerPrice}</span>
          </p>

          {urgencyNote && (
            <p className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-error)] flex items-center justify-center gap-1">
              <Icon name="Clock" size="xs" aria-hidden="true" />
              {urgencyNote}
            </p>
          )}

          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-[var(--space-2x)] self-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] font-[var(--font-semibold)] text-[var(--text-md)] px-[var(--space-8x)] py-[var(--space-4x)] hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            {ctaText}
            <Icon name="ArrowRight" size="sm" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
