// Breadcrumb — navigation trail showing current page location in the app hierarchy.
import Link from "next/link";
import { cn } from "@/ui/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export function Breadcrumb({ items, separator = "/", className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("oq-breadcrumb", className)}>
      <ol className="flex items-center gap-[var(--space-2x)] text-[var(--text-sm)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-[var(--space-2x)]">
              {i > 0 && (
                <span className="text-[var(--color-text-subtle)] select-none" aria-hidden>
                  {separator}
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    isLast
                      ? "font-medium text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)]"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
