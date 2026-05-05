// StatsRow.tsx — horizontal row of StatCards organism. Used in dashboard headers.
import React from "react";
import { StatCard, type StatCardProps } from "@/ui/blocks/molecules/StatCard";
import { cn } from "@/ui/lib/utils";

export interface StatsRowProps {
  stats: Omit<StatCardProps, "className">[];
  className?: string;
}

export function StatsRow({ stats, className }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-[var(--space-4x)]",
        stats.length >= 4 ? "lg:grid-cols-4" : `lg:grid-cols-${Math.min(stats.length, 4)}`,
        className
      )}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
