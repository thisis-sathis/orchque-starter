// FeaturesBlock.tsx — responsive grid of FeatureItems organism.
import React from "react";
import { FeatureItem, type FeatureItemProps } from "@/ui/blocks/molecules/FeatureItem";
import { cn } from "@/ui/lib/utils";

export interface FeaturesBlockProps {
  heading?: string;
  subheading?: string;
  features: Omit<FeatureItemProps, "className">[];
  /** Number of columns on desktop. Default: 3 */
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeaturesBlock({ heading, subheading, features, columns = 3, className }: FeaturesBlockProps) {
  return (
    <section
      className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}
      aria-labelledby={heading ? "features-heading" : undefined}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-3x)]">
            {heading && (
              <h2
                id="features-heading"
                className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]"
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="max-w-2xl mx-auto text-[var(--text-md)] text-[var(--color-text-muted)]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <ul
          className={cn("grid grid-cols-1 gap-[var(--space-8x)]", COLUMN_CLASSES[columns])}
          role="list"
        >
          {features.map((feature, i) => (
            <li key={i}>
              <FeatureItem {...feature} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
