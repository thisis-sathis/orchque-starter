// PricingBundleBlock.tsx — Bundle deal pricing section with value stacking.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

interface BundleItem {
  icon?: IconName;
  title: string;
  description?: string;
  value: string;
  included?: boolean;
}

export interface PricingBundleBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  items: BundleItem[];
  totalValue: string;
  bundlePrice: string;
  currency?: string;
  interval?: string;
  savings?: string;
  ctaText?: string;
  ctaHref?: string;
  guarantee?: string;
  note?: string;
  className?: string;
}

export function PricingBundleBlock({
  badge,
  heading,
  subheading,
  items,
  totalValue,
  bundlePrice,
  currency = "$",
  interval,
  savings,
  ctaText = "Get the bundle",
  ctaHref = "#",
  guarantee,
  note,
  className,
}: PricingBundleBlockProps) {
  const included = items.filter((i) => i.included !== false);

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          {badge && (
            <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              <Icon name="Package" size="xs" />
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)] max-w-xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Bundle card */}
        <div className="rounded-2xl border-2 border-[var(--color-primary)] overflow-hidden shadow-lg">
          {/* Top strip */}
          <div className="bg-[var(--color-primary)] px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-white font-bold text-sm">Everything included in this bundle</p>
            {savings && (
              <span className="bg-white text-[var(--color-primary)] text-xs font-bold px-3 py-1 rounded-full">
                Save {savings}
              </span>
            )}
          </div>

          <div className="bg-[var(--color-surface)] p-8 flex flex-col gap-6">
            {/* Items list */}
            <ul className="flex flex-col divide-y divide-[var(--color-border)]">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "flex items-center gap-4 py-4 first:pt-0 last:pb-0",
                    item.included === false && "opacity-40"
                  )}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] flex items-center justify-center shrink-0">
                    <Icon
                      name={(item.icon ?? "CheckCircle") as IconName}
                      size="sm"
                      className="text-[var(--color-primary)]"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--color-text)]">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-[var(--color-text-muted)] mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>

                  {/* Value */}
                  <div className="shrink-0 text-right">
                    {item.included === false ? (
                      <span className="text-sm text-[var(--color-text-muted)] line-through">
                        {currency}{item.value}
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-[var(--color-success)]">
                        {currency}{item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Total + price */}
            <div className="rounded-xl bg-[var(--color-background)] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm text-[var(--color-text-muted)]">Total value</div>
                <div className="text-2xl font-bold text-[var(--color-text)] line-through decoration-[var(--color-error)]">
                  {currency}{totalValue}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-sm text-[var(--color-text-muted)]">Bundle price</div>
                <div className="text-4xl font-extrabold text-[var(--color-primary)]">
                  {currency}{bundlePrice}
                  {interval && (
                    <span className="text-base font-normal text-[var(--color-text-muted)] ml-1">
                      /{interval}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={ctaHref}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-4 text-base font-bold text-[var(--color-text-on-primary)] hover:opacity-90 transition-opacity"
            >
              <Icon name="Zap" size="sm" />
              {ctaText}
            </a>

            {/* Guarantee + note */}
            <div className="flex flex-col gap-1 text-center">
              {guarantee && (
                <p className="text-xs text-[var(--color-success)] flex items-center justify-center gap-1">
                  <Icon name="ShieldCheck" size="xs" />
                  {guarantee}
                </p>
              )}
              {note && (
                <p className="text-xs text-[var(--color-text-muted)]">{note}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
