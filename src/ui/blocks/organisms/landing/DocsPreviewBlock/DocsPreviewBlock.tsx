// DocsPreviewBlock.tsx — Documentation quick-links section.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface DocLink {
  title: string;
  description: string;
  href: string;
  icon?: IconName;
}

export interface DocsPreviewBlockProps {
  heading?: string;
  subheading?: string;
  links: DocLink[];
  allDocsHref?: string;
  allDocsLabel?: string;
  className?: string;
}

export function DocsPreviewBlock({
  heading = "Documentation",
  subheading = "Everything you need to get up and running.",
  links,
  allDocsHref = "/docs",
  allDocsLabel = "View full docs",
  className,
}: DocsPreviewBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-10x)]">
        <div className="flex items-end justify-between flex-wrap gap-[var(--space-4x)]">
          <div className="flex flex-col gap-[var(--space-2x)]">
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
          {allDocsHref && (
            <a
              href={allDocsHref}
              className="inline-flex items-center gap-[var(--space-1x)] text-[var(--text-sm)] text-[var(--color-primary)] font-[var(--font-semibold)] hover:underline"
            >
              {allDocsLabel}
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="grid gap-[var(--space-4x)] sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5x)] flex items-start gap-[var(--space-4x)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-primary)] transition-all"
            >
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-overlay)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                <Icon
                  name={link.icon ?? "BookOpen"}
                  size="sm"
                  className="text-[var(--color-primary)] group-hover:text-white transition-colors"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  {link.title}
                </p>
                <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-1x)] leading-[var(--leading-relaxed)]">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
