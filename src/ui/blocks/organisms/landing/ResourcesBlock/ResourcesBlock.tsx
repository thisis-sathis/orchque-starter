// ResourcesBlock.tsx — Resources hub: articles, guides, case studies, videos.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";
import type { IconName } from "@/ui/components/icon";

export type ResourceType = "article" | "guide" | "case-study" | "video" | "template";

export interface Resource {
  type: ResourceType;
  icon?: IconName;
  title: string;
  description: string;
  tag?: string;
  readTime?: string;
  href?: string;
}

export interface ResourcesBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  resources: Resource[];
  /** Show type filter tabs */
  showFilter?: boolean;
  className?: string;
}

const typeLabel: Record<ResourceType, string> = {
  "article":    "Article",
  "guide":      "Guide",
  "case-study": "Case Study",
  "video":      "Video",
  "template":   "Template",
};

const typeColor: Record<ResourceType, string> = {
  "article":    "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  "guide":      "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  "case-study": "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  "video":      "bg-[var(--color-highlight)]/15 text-[var(--color-text)]",
  "template":   "bg-[var(--color-surface-overlay)] text-[var(--color-text-muted)]",
};

export function ResourcesBlock({
  badge,
  heading,
  subheading,
  resources,
  className,
}: ResourcesBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
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

        {/* Resource cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6x)]">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href ?? "#"}
              className={cn(
                "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)]",
                "hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-md)] transition-all group"
              )}
            >
              {/* Icon + type badge */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon
                    name={resource.icon ?? "FileText"}
                    size="sm"
                    className="text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                </div>
                <span className={cn("inline-flex items-center rounded-full px-[var(--space-2x)] py-[var(--space-halfx)] text-[var(--text-xs)] font-[var(--font-medium)]", typeColor[resource.type])}>
                  {typeLabel[resource.type]}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-[var(--space-2x)] flex-1">
                <h3 className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-[var(--leading-snug)]">
                  {resource.title}
                </h3>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {resource.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-[var(--space-2x)] border-t border-[var(--color-border)]">
                {resource.tag && (
                  <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{resource.tag}</span>
                )}
                <div className="flex items-center gap-[var(--space-1x)] text-[var(--text-xs)] text-[var(--color-text-muted)] ml-auto">
                  {resource.readTime && <span>{resource.readTime}</span>}
                  <Icon name="ArrowRight" size="xs" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
