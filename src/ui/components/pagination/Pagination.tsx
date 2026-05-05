// Pagination — page navigation control with prev/next and numbered page buttons.
import { cn } from "@/ui/lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;

  const visiblePages = showEllipsis
    ? pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    : pages;

  return (
    <nav aria-label="Pagination" className={cn("oq-pagination flex items-center gap-[var(--space-1x)]", className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="oq-pagination__btn"
      >
        ‹
      </button>

      {visiblePages.map((p, i) => {
        const prev = visiblePages[i - 1];
        const showGap = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-[var(--space-1x)]">
            {showGap && <span className="oq-pagination__ellipsis">…</span>}
            <button
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn("oq-pagination__btn", p === page && "oq-pagination__btn--active")}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="oq-pagination__btn"
      >
        ›
      </button>
    </nav>
  );
}
