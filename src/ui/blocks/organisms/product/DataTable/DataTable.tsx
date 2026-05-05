// DataTable.tsx — generic data table organism. Column + row config driven.
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  /** Custom cell renderer. Receives row data. */
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Row key extractor. Default: row index. */
  rowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No data",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]", className)}>
      <table className="w-full text-[var(--text-sm)] text-left" role="grid">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-[var(--space-4x)] py-[var(--space-3x)]",
                  "text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]",
                  "text-[var(--color-text-muted)] whitespace-nowrap",
                  col.className
                )}
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-[var(--space-4x)] py-[var(--space-8x)] text-center text-[var(--color-text-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={rowKey ? rowKey(row, i) : i}
                className="border-b border-[var(--color-border)] last:border-0 bg-[var(--color-surface)] hover:bg-[var(--color-surface-raised)] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-[var(--space-4x)] py-[var(--space-3x)] text-[var(--color-text)]", col.className)}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
