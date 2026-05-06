// CareersBlock.tsx — Open positions + culture pitch for the landing page.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface JobListing {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  href?: string;
}

export interface CareersPerk {
  icon?: string;
  title: string;
  description: string;
}

export interface CareersBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  perks?: CareersPerk[];
  jobs?: JobListing[];
  ctaText?: string;
  ctaHref?: string;
  emptyMessage?: string;
  className?: string;
}

export function CareersBlock({
  badge,
  heading,
  subheading,
  perks = [],
  jobs = [],
  ctaText = "See all open roles",
  ctaHref = "/careers",
  emptyMessage = "No open positions right now — but we're always interested in great people. Drop us a line.",
  className,
}: CareersBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-12x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)] max-w-2xl mx-auto">
          {badge && (
            <span className="inline-flex w-fit mx-auto items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
              {badge}
            </span>
          )}
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Perks */}
        {perks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[var(--space-5x)]">
            {perks.map((perk) => (
              <div key={perk.title} className="flex gap-[var(--space-3x)] items-start">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={(perk.icon ?? "Heart") as any} size="sm" className="text-[var(--color-primary)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    {perk.title}
                  </p>
                  <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job listings */}
        <div className="flex flex-col gap-[var(--space-4x)]">
          <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
            Open positions
          </h3>
          {jobs.length === 0 ? (
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] py-[var(--space-6x)] text-center border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)]">
              {emptyMessage}
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface)]" role="list">
              {jobs.map((job) => (
                <li key={job.title}>
                  <a
                    href={job.href ?? ctaHref}
                    className="flex items-center justify-between px-[var(--space-5x)] py-[var(--space-4x)] hover:bg-[var(--color-surface-raised)] transition-colors group"
                  >
                    <div>
                      <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                        {job.title}
                      </p>
                      <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                        {job.department} · {job.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-[var(--space-3x)]">
                      <span className="hidden sm:inline-flex items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-medium)] text-[var(--color-primary)]">
                        {job.type}
                      </span>
                      <Icon name="ArrowRight" size="sm" className="text-[var(--color-text-muted)]" aria-hidden="true" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
