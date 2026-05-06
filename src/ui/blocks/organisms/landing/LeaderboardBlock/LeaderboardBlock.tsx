// LeaderboardBlock.tsx — Community leaderboard with ranks, badges, and points.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

interface LeaderboardEntry {
  rank?: number;
  name: string;
  handle?: string;
  avatarInitials?: string;
  points: number;
  pointsLabel?: string;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

export interface LeaderboardBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  entries: LeaderboardEntry[];
  pointsLabel?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const RANK_STYLES: Record<number, string> = {
  1: "bg-yellow-400 text-yellow-900",
  2: "bg-gray-300 text-gray-700",
  3: "bg-orange-400 text-orange-900",
};

const RANK_ICONS: Record<number, IconName> = {
  1: "Trophy",
  2: "Medal",
  3: "Award",
};

export function LeaderboardBlock({
  badge,
  heading,
  subheading,
  entries,
  pointsLabel = "points",
  ctaText,
  ctaHref,
  className,
}: LeaderboardBlockProps) {
  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        <div className="text-center flex flex-col gap-[var(--space-3x)]">
          {badge && (
            <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              <Icon name="Trophy" size="xs" />
              {badge}
            </span>
          )}
          {heading && (
            <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
          )}
        </div>

        {/* Leaderboard table */}
        <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-6 py-3 bg-[var(--color-background)] border-b border-[var(--color-border)] text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            <span>Rank</span>
            <span>Builder</span>
            <span className="text-right">{pointsLabel}</span>
          </div>

          {/* Entries */}
          <ul>
            {entries.map((entry, idx) => {
              const rank = entry.rank ?? idx + 1;
              const isTop3 = rank <= 3;
              return (
                <li
                  key={idx}
                  className={cn(
                    "grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-6 py-4 border-b border-[var(--color-border)] last:border-0 transition-colors",
                    entry.highlight
                      ? "bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)]"
                      : "bg-[var(--color-surface)] hover:bg-[var(--color-background)]"
                  )}
                >
                  {/* Rank badge */}
                  <div className="flex items-center justify-center">
                    {isTop3 ? (
                      <span
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          RANK_STYLES[rank]
                        )}
                      >
                        <Icon name={RANK_ICONS[rank]} size="xs" />
                      </span>
                    ) : (
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[var(--color-text-muted)] bg-[var(--color-background)]">
                        {rank}
                      </span>
                    )}
                  </div>

                  {/* Identity */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] flex items-center justify-center text-xs font-bold text-[var(--color-primary)] shrink-0 select-none">
                      {entry.avatarInitials ?? entry.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--color-text)] flex items-center gap-2 truncate">
                        {entry.name}
                        {entry.badge && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                            style={{
                              background: entry.badgeColor
                                ? `${entry.badgeColor}22`
                                : "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                              color: entry.badgeColor ?? "var(--color-primary)",
                            }}
                          >
                            {entry.badge}
                          </span>
                        )}
                      </div>
                      {entry.handle && (
                        <div className="text-xs text-[var(--color-text-muted)] truncate">
                          {entry.handle}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right font-bold text-[var(--color-text)] tabular-nums">
                    {entry.points.toLocaleString()}
                    <span className="ml-1 text-xs font-normal text-[var(--color-text-muted)]">
                      {entry.pointsLabel ?? pointsLabel}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA */}
        {ctaText && ctaHref && (
          <div className="text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-primary)] hover:opacity-90 transition-opacity"
            >
              {ctaText}
              <Icon name="ChevronRight" size="xs" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
