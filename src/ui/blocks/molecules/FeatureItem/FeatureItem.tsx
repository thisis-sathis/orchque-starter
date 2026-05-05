// FeatureItem.tsx — icon + headline + description molecule. Used in FeaturesBlock grid.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface FeatureItemProps {
  icon?: IconName;
  title: string;
  description: string;
  className?: string;
}

export function FeatureItem({ icon, title, description, className }: FeatureItemProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-3x)]", className)}>
      {icon && (
        <div
          className={cn(
            "inline-flex items-center justify-center w-10 h-10",
            "rounded-[var(--radius-lg)]",
            "bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
            "text-[var(--color-primary)]"
          )}
        >
          <Icon name={icon} size="md" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-col gap-[var(--space-1x)]">
        <h3 className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)]">
          {title}
        </h3>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
          {description}
        </p>
      </div>
    </div>
  );
}
