// TestimonialsBlock.tsx — masonry/grid testimonial cards organism.
import React from "react";
import { TestimonialCard, type TestimonialCardProps } from "@/ui/blocks/molecules/TestimonialCard";
import { cn } from "@/ui/lib/utils";

export interface TestimonialsBlockProps {
  heading?: string;
  subheading?: string;
  testimonials: Omit<TestimonialCardProps, "className">[];
  className?: string;
}

export function TestimonialsBlock({ heading, subheading, testimonials, className }: TestimonialsBlockProps) {
  return (
    <section
      className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}
      aria-labelledby={heading ? "testimonials-heading" : undefined}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-3x)]">
            {heading && (
              <h2 id="testimonials-heading" className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6x)]" role="list">
          {testimonials.map((t, i) => (
            <li key={i}>
              <TestimonialCard {...t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
