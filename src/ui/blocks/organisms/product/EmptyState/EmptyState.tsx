// EmptyState.tsx — empty/zero state organism for dashboard and list views.
import React from "react";
import { Button } from "@/ui/components/button";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface EmptyStateProps {
  icon?: IconName;
  heading: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, heading, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "gap-[var(--space-4x)] py-[var(--space-12x)] px-[var(--space-6x)]",
        "rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border)]",
        className
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-surface-raised)] flex items-center justify-center text-[var(--color-text-muted)]">
          <Icon name={icon} size="lg" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-col gap-[var(--space-2x)]">
        <p className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)]">{heading}</p>
        {description && (
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] max-w-sm">{description}</p>
        )}
      </div>
      {action && (
        <Button size="sm" onClick={action.onClick} asChild={!!action.href}>
          {action.href ? <a href={action.href}>{action.label}</a> : action.label}
        </Button>
      )}
    </div>
  );
}
