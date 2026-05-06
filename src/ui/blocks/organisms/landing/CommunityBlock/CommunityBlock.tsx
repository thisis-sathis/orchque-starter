// CommunityBlock.tsx — Community channels, stats, and join CTA.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";
import type { IconName } from "@/ui/components/icon";

export interface CommunityChannel {
  icon: IconName;
  platform: string;
  description: string;
  members?: string;
  href: string;
  ctaLabel: string;
}

export interface CommunityStat {
  value: string;
  label: string;
}

export interface CommunityBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  stats?: CommunityStat[];
  channels: CommunityChannel[];
  className?: string;
}

export function CommunityBlock({
  badge,
  heading,
  subheading,
  stats = [],
  channels,
  className,
}: CommunityBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
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

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-5x)]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col gap-[var(--space-1x)]">
                <p className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                  {stat.value}
                </p>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[var(--space-5x)]">
          {channels.map((ch) => (
            <div
              key={ch.platform}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)] hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-md)] transition-all"
            >
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
                <Icon name={ch.icon} size="md" className="text-[var(--color-primary)]" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-[var(--space-1x)]">
                <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {ch.platform}
                </p>
                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {ch.description}
                </p>
                {ch.members && (
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-1x)]">
                    {ch.members} members
                  </p>
                )}
              </div>
              <Button size="sm" variant="outline" asChild className="mt-auto">
                <a href={ch.href}>{ch.ctaLabel}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
