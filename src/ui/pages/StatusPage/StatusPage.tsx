// StatusPage.tsx — full-screen status/feedback page. Used for errors, 404, success, offline.
// All copy is data-driven from props. No HTML layout code in app routes.
import React from "react";
import { cn } from "../../lib/utils";

export interface StatusPageAction {
  /** Button/link label */
  label: string;
  href?: string;
  /** If no href, caller must handle via onClick (pass a Client Component wrapper) */
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export interface StatusPageProps {
  /** Large emoji or short symbol shown at the top — e.g. "✅", "404", "⚠️" */
  icon?: string;
  /** Whether the icon is a large numeral (e.g. "404") — renders in primary color, larger */
  iconIsNumeral?: boolean;
  /** Main heading */
  heading: string;
  /** Supporting paragraph */
  body?: string;
  /** Small monospace detail — e.g. Error ID */
  detail?: string;
  /** CTA buttons/links — first is primary by default */
  actions?: StatusPageAction[];
  /** Small footnote text below actions */
  footnote?: React.ReactNode;
  className?: string;
}

export function StatusPage({
  icon,
  iconIsNumeral = false,
  heading,
  body,
  detail,
  actions = [],
  footnote,
  className,
}: StatusPageProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center",
        "px-[var(--space-6x)] text-center gap-[var(--space-6x)]",
        "bg-[var(--color-surface)]",
        className
      )}
    >
      <div className="flex flex-col items-center gap-[var(--space-4x)]">
        {icon && (
          iconIsNumeral ? (
            <span className="text-[var(--text-7xl)] font-[var(--font-bold)] text-[var(--color-primary)] tabular-nums leading-none">
              {icon}
            </span>
          ) : (
            <span className="text-[8rem] leading-none" role="img" aria-hidden="true">
              {icon}
            </span>
          )
        )}

        <h1 className="text-[var(--text-2xl)] font-[var(--font-semibold)] text-[var(--color-text)]">
          {heading}
        </h1>

        {body && (
          <p className="text-[var(--color-text-muted)] max-w-[28rem] text-[var(--text-base)] leading-[var(--leading-relaxed)]">
            {body}
          </p>
        )}

        {detail && (
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] font-mono bg-[var(--color-surface-raised)] px-[var(--space-3x)] py-[var(--space-1x)] rounded-[var(--radius-md)]">
            {detail}
          </p>
        )}
      </div>

      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-[var(--space-3x)]">
          {actions.map((action, i) => {
            const isPrimary = action.variant === "primary" || (action.variant === undefined && i === 0);
            const sharedClasses = cn(
              "inline-flex items-center justify-center",
              "px-[var(--space-6x)] py-[var(--space-3x)]",
              "rounded-[var(--radius-lg)]",
              "font-[var(--font-semibold)] text-[var(--text-sm)]",
              "transition-colors"
            );
            const variantClasses = isPrimary
              ? "bg-[var(--color-primary)] text-[var(--color-text-on-primary)] hover:bg-[var(--color-primary)]/90"
              : "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)]/60";

            if (action.href) {
              return (
                <a key={i} href={action.href} className={cn(sharedClasses, variantClasses)}>
                  {action.label}
                </a>
              );
            }
            return (
              <button key={i} onClick={action.onClick} className={cn(sharedClasses, variantClasses)}>
                {action.label}
              </button>
            );
          })}
        </div>
      )}

      {footnote && (
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{footnote}</p>
      )}
    </div>
  );
}
