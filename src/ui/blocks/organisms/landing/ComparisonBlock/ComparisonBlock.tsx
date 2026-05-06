// ComparisonBlock.tsx — Feature comparison table vs competitors.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface ComparisonRow {
  feature: string;
  ours: boolean | string;
  theirs: boolean | string;
}

export interface ComparisonBlockProps {
  heading?: string;
  subheading?: string;
  ourLabel?: string;
  theirLabel?: string;
  rows: ComparisonRow[];
  className?: string;
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Icon name="Check" size="sm" className="text-[var(--color-success)] mx-auto" aria-label="Yes" />
    ) : (
      <Icon name="X" size="sm" className="text-[var(--color-failure)] mx-auto" aria-label="No" />
    );
  }
  return <span className="text-[var(--text-sm)] text-[var(--color-text)]">{value}</span>;
}

export function ComparisonBlock({
  heading = "How we compare",
  subheading,
  ourLabel = "Our product",
  theirLabel = "ChatGPT",
  rows,
  className,
}: ComparisonBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]", className)}>
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
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

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="px-[var(--space-5x)] py-[var(--space-4x)] text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text-muted)] w-1/2">
                  Feature
                </th>
                <th className="px-[var(--space-5x)] py-[var(--space-4x)] text-center text-[var(--text-sm)] font-[var(--font-bold)] text-[var(--color-primary)] w-1/4">
                  {ourLabel}
                </th>
                <th className="px-[var(--space-5x)] py-[var(--space-4x)] text-center text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text-muted)] w-1/4">
                  {theirLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-[var(--color-border)] last:border-0",
                    i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-raised)]"
                  )}
                >
                  <td className="px-[var(--space-5x)] py-[var(--space-3x)] text-[var(--text-sm)] text-[var(--color-text)]">
                    {row.feature}
                  </td>
                  <td className="px-[var(--space-5x)] py-[var(--space-3x)] text-center">
                    <Cell value={row.ours} />
                  </td>
                  <td className="px-[var(--space-5x)] py-[var(--space-3x)] text-center">
                    <Cell value={row.theirs} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
