// Table — semantic HTML table with token-based styles for data display.
import { cn } from "@/ui/lib/utils";

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableHeadProps {
  children?: React.ReactNode;
  className?: string;
}

export interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="oq-table-wrapper w-full overflow-auto">
      <table className={cn("oq-table w-full caption-bottom text-[var(--text-sm)]", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-[var(--color-border)]", className)}>{children}</thead>;
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <tr className={cn("border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-raised)]", className)}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <th className={cn("h-[var(--space-10x)] px-[var(--space-3x)] text-left align-middle font-medium text-[var(--color-text-muted)]", className)}>
      {children}
    </th>
  );
}

export function TableCell({ children, className, colSpan }: TableCellProps) {
  return (
    <td colSpan={colSpan} className={cn("px-[var(--space-3x)] py-[var(--space-3x)] align-middle text-[var(--color-text)]", className)}>
      {children}
    </td>
  );
}
