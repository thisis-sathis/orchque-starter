// CustomerStoriesBlock.tsx — Featured customer success stories / case study previews.
"use client";
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface CustomerStory {
  company: string;
  logoSrc?: string;
  industry?: string;
  metric: string;
  metricLabel: string;
  quote: string;
  authorName: string;
  authorRole: string;
  href?: string;
}

export interface CustomerStoriesBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  stories: CustomerStory[];
  className?: string;
}

export function CustomerStoriesBlock({
  badge,
  heading,
  subheading,
  stories,
  className,
}: CustomerStoriesBlockProps) {
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

        {/* Story cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6x)]">
          {stories.map((story) => (
            <article
              key={story.company}
              className={cn(
                "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-5x)]",
                story.href && "hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-md)] transition-all cursor-pointer"
              )}
              onClick={story.href ? () => (window.location.href = story.href!) : undefined}
            >
              {/* Company + industry */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[var(--space-3x)]">
                  {story.logoSrc ? (
                    <img src={story.logoSrc} alt={story.company} className="h-7 w-auto object-contain" />
                  ) : (
                    <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--text-xs)] font-[var(--font-bold)] text-[var(--color-primary)]">
                      {story.company[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                      {story.company}
                    </p>
                    {story.industry && (
                      <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{story.industry}</p>
                    )}
                  </div>
                </div>
                {story.href && (
                  <Icon name="ArrowUpRight" size="sm" className="text-[var(--color-text-muted)]" aria-hidden="true" />
                )}
              </div>

              {/* Metric highlight */}
              <div className="rounded-[var(--radius-lg)] bg-[var(--color-primary)]/5 px-[var(--space-4x)] py-[var(--space-3x)]">
                <p className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                  {story.metric}
                </p>
                <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{story.metricLabel}</p>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)] italic">
                "{story.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-[var(--space-2x)] pt-[var(--space-2x)] border-t border-[var(--color-border)]">
                <div className="w-7 h-7 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center text-[var(--text-xs)] font-[var(--font-bold)] text-[var(--color-text-muted)]">
                  {story.authorName[0]}
                </div>
                <div>
                  <p className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    {story.authorName}
                  </p>
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{story.authorRole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
