"use client";
// ScheduleMeetingBlock.tsx — "Book a demo / schedule a call" CTA block.
// Embeds a calendar link or shows a modal trigger; uses Calendly-style link by default.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface MeetingPerk {
  icon?: string;
  label: string;
}

export interface ScheduleMeetingBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  perks?: MeetingPerk[];
  ctaText?: string;
  /** Direct Calendly / cal.com / link — opens in new tab */
  calendarHref?: string;
  /** Host name shown on the card */
  hostName?: string;
  hostRole?: string;
  hostAvatarSrc?: string;
  availabilityNote?: string;
  className?: string;
}

export function ScheduleMeetingBlock({
  badge,
  heading,
  subheading,
  perks = [],
  ctaText = "Book a 30-min demo",
  calendarHref = "#",
  hostName,
  hostRole,
  hostAvatarSrc,
  availabilityNote = "Usually responds within a few hours",
  className,
}: ScheduleMeetingBlockProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left — copy */}
          <div className="p-[var(--space-10x)] flex flex-col gap-[var(--space-6x)] justify-center">
            {badge && (
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-primary)]/10 px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-primary)]">
                {badge}
              </span>
            )}
            <div className="flex flex-col gap-[var(--space-2x)]">
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
              {subheading && (
                <p className="text-[var(--text-md)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
                  {subheading}
                </p>
              )}
            </div>

            {perks.length > 0 && (
              <ul className="flex flex-col gap-[var(--space-3x)]" role="list">
                {perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-[var(--space-3x)]">
                    <Icon
                      name={(perk.icon ?? "CheckCircle2") as any}
                      size="sm"
                      className="text-[var(--color-success)] flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{perk.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button
              size="lg"
              asChild
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <a href={calendarHref} target="_blank" rel="noopener noreferrer">
                <Icon name="CalendarDays" size="sm" className="mr-[var(--space-2x)]" aria-hidden="true" />
                {ctaText}
              </a>
            </Button>
          </div>

          {/* Right — host card / calendar placeholder */}
          <div className="bg-[var(--color-surface-raised)] border-l border-[var(--color-border)] p-[var(--space-10x)] flex flex-col items-center justify-center gap-[var(--space-6x)]">
            {/* Calendar icon illustration */}
            <div className="w-24 h-24 rounded-[var(--radius-xl)] bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Icon name="CalendarCheck2" size="xl" className="text-[var(--color-primary)]" aria-hidden="true" />
            </div>

            {/* Host info */}
            {hostName && (
              <div className="flex items-center gap-[var(--space-3x)]">
                {hostAvatarSrc ? (
                  <img src={hostAvatarSrc} alt={hostName} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] font-[var(--font-bold)] text-[var(--text-md)]">
                    {hostName[0]}
                  </div>
                )}
                <div>
                  <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                    {hostName}
                  </p>
                  {hostRole && (
                    <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{hostRole}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-[var(--space-2x)] text-[var(--text-xs)] text-[var(--color-text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] flex-shrink-0" />
              {availabilityNote}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
