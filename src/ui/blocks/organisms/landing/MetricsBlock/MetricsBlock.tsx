// MetricsBlock.tsx — Uptime/performance metrics with sparkline-style bar graph.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface MetricStat {
  label: string;
  value: string;
  sub?: string;
}

export interface UptimeDay {
  date: string;
  status: "up" | "degraded" | "down";
}

export interface MetricsBlockProps {
  heading?: string;
  subheading?: string;
  stats?: MetricStat[];
  uptimeLabel?: string;
  uptimeDays?: UptimeDay[];
  className?: string;
}

const statusColor: Record<string, string> = {
  up: "var(--color-success)",
  degraded: "var(--color-warning)",
  down: "var(--color-failure)",
};

export function MetricsBlock({
  heading = "Built for reliability",
  subheading = "Real-time performance you can trust.",
  stats = [],
  uptimeLabel = "90-day uptime",
  uptimeDays = [],
  className,
}: MetricsBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
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

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-4x)]">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5x)] flex flex-col gap-[var(--space-1x)] text-center"
              >
                <span className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-primary)]">
                  {s.value}
                </span>
                <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                  {s.label}
                </span>
                {s.sub && (
                  <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{s.sub}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Uptime bar graph */}
        {uptimeDays.length > 0 && (
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6x)] flex flex-col gap-[var(--space-4x)]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">
                {uptimeLabel}
              </span>
              <div className="flex items-center gap-[var(--space-4x)]">
                {(["up", "degraded", "down"] as const).map((s) => (
                  <div key={s} className="flex items-center gap-[var(--space-1x)]">
                    <span
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ background: statusColor[s] }}
                    />
                    <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] capitalize">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-[2px] h-10">
              {uptimeDays.map((d, i) => (
                <div
                  key={i}
                  title={`${d.date}: ${d.status}`}
                  className="flex-1 rounded-sm min-w-[2px]"
                  style={{
                    background: statusColor[d.status],
                    height: d.status === "up" ? "100%" : d.status === "degraded" ? "60%" : "20%",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[var(--text-xs)] text-[var(--color-text-subtle)]">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
