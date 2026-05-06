// WhatsIncludedBlock.tsx — Visual breakdown: every page, system, and kit included.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface IncludedCategory {
  icon?: IconName;
  title: string;
  items: string[];
}

export interface WhatsIncludedBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  categories: IncludedCategory[];
  totalLabel?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function WhatsIncludedBlock({
  badge = "What's included",
  heading = "Everything already built — just configure and launch",
  subheading = "Pages, systems, UI kit, and integrations — pre-wired so you don't start from zero.",
  categories,
  totalLabel,
  ctaText = "Get the starter",
  ctaHref = "/auth/signup",
  className,
}: WhatsIncludedBlockProps) {
  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="flex flex-col items-center gap-[var(--space-3x)] text-center">
          {badge && (
            <span className="px-[var(--space-3x)] py-[var(--space-1x)] rounded-full border border-[var(--color-border)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="max-w-xl text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Grid of categories */}
        <div className="grid gap-[var(--space-5x)] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5x)] flex flex-col gap-[var(--space-3x)]"
            >
              {/* Category header */}
              <div className="flex items-center gap-[var(--space-2x)]">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={cat.icon ?? "Package"}
                    size="sm"
                    className="text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-text)]">{cat.title}</p>
              </div>

              {/* Item list */}
              <ul className="flex flex-col gap-[var(--space-2x)]">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-[var(--space-2x)] text-[var(--text-xs)] text-[var(--color-text-muted)]">
                    <Icon name="CheckCircle" size="xs" className="text-[var(--color-success)] flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Total + CTA */}
        <div className="flex flex-col items-center gap-[var(--space-4x)]">
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            {totalLabel ?? `${totalItems}+ components, pages, and systems — all included.`}
          </p>
          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="inline-flex items-center gap-[var(--space-2x)] px-[var(--space-6x)] py-[var(--space-3x)] rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-[var(--color-text-on-primary)] text-[var(--text-sm)] font-[var(--font-semibold)] hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              {ctaText}
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
