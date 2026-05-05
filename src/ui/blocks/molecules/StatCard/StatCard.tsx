// StatCard.tsx — number + label + optional trend molecule. Used in StatsRow organism.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface StatCardProps {
  /** The main metric value (e.g. "1,234" or "$4.2k") */
  value: string;
  /** Label describing the metric */
  label: string;
  /** Optional trend percentage (e.g. 12.5) */
  trend?: number;
  /** Optional description below the label */
  description?: string;
  className?: string;
}

export function StatCard({ value, label, trend, description, className }: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-1x)] p-[var(--space-4x)]",
        "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{label}</p>

      <div className="flex items-end gap-[var(--space-2x)]">
        <span className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
          {value}
        </span>

        {trend !== undefined && (
          <span
            className={cn(
              "flex items-center gap-[var(--space-halfx)] mb-[var(--space-1x)]",
              "text-[var(--text-xs)] font-[var(--font-semibold)]",
              isPositive && "text-[var(--color-success)]",
              isNegative && "text-[var(--color-failure)]"
            )}
          >
            <Icon
              name={isPositive ? "TrendingUp" : "TrendingDown"}
              size="xs"
              aria-hidden="true"
            />
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      {description && (
        <p className="text-[var(--text-xs)] text-[var(--color-text-subtle)]">{description}</p>
      )}
    </div>
  );
}
