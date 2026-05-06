// RoadmapBlock.tsx — Product blueprint + upcoming phases.
import React from "react";
import { Icon } from "@/ui/components/icon";
import type { IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export type PhaseStatus = "done" | "in-progress" | "upcoming";

export interface RoadmapPhase {
  phase: number;
  title: string;
  description: string;
  status: PhaseStatus;
  icon?: IconName;
  items?: string[];
}

export interface RoadmapBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  phases: RoadmapPhase[];
  className?: string;
}

const statusConfig: Record<PhaseStatus, { label: string; dot: string; border: string; bg: string }> = {
  done:        { label: "Done",        dot: "bg-[var(--color-success)]", border: "border-[var(--color-success)]/40", bg: "bg-[var(--color-success)]/5" },
  "in-progress":{ label: "In progress", dot: "bg-[var(--color-primary)] animate-pulse", border: "border-[var(--color-primary)]/40", bg: "bg-[var(--color-primary)]/5" },
  upcoming:    { label: "Upcoming",    dot: "bg-[var(--color-border)]", border: "border-[var(--color-border)]", bg: "bg-[var(--color-surface-raised)]" },
};

export function RoadmapBlock({ badge, heading, subheading, phases, className }: RoadmapBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[var(--color-border)]" aria-hidden="true" />

          {phases.map((phase, i) => {
            const s = statusConfig[phase.status];
            return (
              <div key={i} className="relative pl-[var(--space-12x)] pb-[var(--space-8x)] last:pb-0">
                {/* Dot */}
                <div className={cn("absolute left-0 top-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10", s.border, s.bg)}>
                  {phase.icon
                    ? <Icon name={phase.icon} size="sm" className="text-[var(--color-text-muted)]" aria-hidden="true" />
                    : <span className={cn("w-3 h-3 rounded-full", s.dot)} />
                  }
                </div>

                {/* Card */}
                <div className={cn("rounded-[var(--radius-lg)] border p-[var(--space-5x)] flex flex-col gap-[var(--space-3x)]", s.border, s.bg)}>
                  <div className="flex items-center justify-between gap-[var(--space-4x)] flex-wrap">
                    <div>
                      <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] font-[var(--font-medium)]">
                        Phase {phase.phase}
                      </span>
                      <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-text)]">
                        {phase.title}
                      </h3>
                    </div>
                    <span className={cn(
                      "text-[var(--text-xs)] font-[var(--font-medium)] px-[var(--space-2x)] py-[var(--space-halfx)] rounded-full",
                      phase.status === "done"         && "bg-[var(--color-success)]/10 text-[var(--color-success)]",
                      phase.status === "in-progress"  && "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
                      phase.status === "upcoming"     && "bg-[var(--color-surface-overlay)] text-[var(--color-text-muted)]",
                    )}>
                      {s.label}
                    </span>
                  </div>
                  <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{phase.description}</p>
                  {phase.items && phase.items.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-1x)]">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)] flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
