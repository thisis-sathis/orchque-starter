// PricingCard.tsx — single plan card molecule. Data-driven from product.config.json pricing.plans[].
import React from "react";
import { Button } from "@/ui/components/button";
import { Icon } from "@/ui/components/icon";
import { Badge } from "@/ui/components/badge";
import { cn } from "@/ui/lib/utils";

export interface PricingCardProps {
  name: string;
  price: number;
  interval?: "month" | "year" | "one-time";
  currency?: string;
  description?: string;
  features: string[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  /** Highlights the card as the recommended plan */
  featured?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  interval = "month",
  currency = "USD",
  description,
  features,
  ctaText = "Get started",
  ctaHref,
  onCtaClick,
  featured,
  badge,
  className,
}: PricingCardProps) {
  const currencySymbol = currency === "USD" ? "$" : currency;

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-6x)] p-[var(--space-6x)]",
        "rounded-[var(--radius-xl)] border",
        featured
          ? "border-[var(--color-primary)] shadow-[var(--shadow-lg)] bg-[var(--color-surface)]"
          : "border-[var(--color-border)] shadow-[var(--shadow-sm)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-[var(--space-2x)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">{name}</h3>
          {badge && <Badge variant={featured ? "primary" : "default"} label={badge} />}
        </div>
        {description && (
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{description}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-[var(--space-1x)]">
        <span className="text-[var(--text-4xl)] font-[var(--font-bold)] text-[var(--color-text)]">
          {currencySymbol}{price}
        </span>
        {interval !== "one-time" && (
          <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">/{interval}</span>
        )}
        {interval === "one-time" && (
          <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">one-time</span>
        )}
      </div>

      {/* CTA */}
      <Button
        variant={featured ? "primary" : "outline"}
        className="w-full"
        onClick={onCtaClick}
        {...(ctaHref ? { asChild: false } : {})}
      >
        {ctaHref ? <a href={ctaHref}>{ctaText}</a> : ctaText}
      </Button>

      {/* Features list */}
      <ul className="flex flex-col gap-[var(--space-3x)]">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-[var(--space-2x)]">
            <Icon
              name="Check"
              size="sm"
              className="text-[var(--color-success)] mt-[1px] shrink-0"
              aria-hidden="true"
            />
            <span className="text-[var(--text-sm)] text-[var(--color-text)]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
