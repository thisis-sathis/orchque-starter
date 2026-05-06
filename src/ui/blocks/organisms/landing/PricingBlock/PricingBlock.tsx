// PricingBlock.tsx — grid of PricingCards organism. Data-driven from config pricing.plans[].
import React from "react";
import { PricingCard, type PricingCardProps } from "@/ui/blocks/molecules/PricingCard";
import { cn } from "@/ui/lib/utils";

export interface PricingBlockProps {
  heading?: string;
  subheading?: string;
  plans: PricingCardProps[];
  className?: string;
}

export function PricingBlock({ heading, subheading, plans, className }: PricingBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        "bg-[var(--landing-section-alt-bg,var(--color-surface-raised))]",
        className
      )}
      aria-labelledby={heading ? "pricing-heading" : undefined}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-3x)]">
            {heading && (
              <h2 id="pricing-heading" className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-[var(--space-6x)]",
            plans.length === 2 && "md:grid-cols-2 max-w-3xl mx-auto",
            plans.length === 3 && "md:grid-cols-3",
            plans.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
