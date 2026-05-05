// PageHeader.tsx — product page header with title, description, and optional action button.
import React from "react";
import { Button } from "@/ui/components/button";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Primary action button */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: IconName;
  };
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-[var(--space-4x)] mb-[var(--space-6x)]", className)}>
      <div className="flex flex-col gap-[var(--space-1x)]">
        <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">{title}</h1>
        {description && (
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{description}</p>
        )}
      </div>

      {action && (
        <Button
          size="sm"
          onClick={action.onClick}
          asChild={!!action.href}
          className="shrink-0"
        >
          {action.href ? (
            <a href={action.href}>
              {action.icon && <Icon name={action.icon} size="sm" aria-hidden="true" className="mr-[var(--space-2x)]" />}
              {action.label}
            </a>
          ) : (
            <>
              {action.icon && <Icon name={action.icon} size="sm" aria-hidden="true" className="mr-[var(--space-2x)]" />}
              {action.label}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
