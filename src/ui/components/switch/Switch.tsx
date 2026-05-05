// Switch — binary toggle for boolean settings like notifications, dark mode, feature flags.
"use client";

import * as Primitive from "@radix-ui/react-switch";
import { cn } from "@/ui/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Switch({ checked, onCheckedChange, label, description, disabled, id, className }: SwitchProps) {
  const switchId = id ?? (label ? `switch-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className={cn("oq-switch-wrapper flex items-center justify-between gap-[var(--space-4x)]", className)}>
      {(label || description) && (
        <div className="flex flex-col gap-[var(--space-0-5x)]">
          {label && (
            <label htmlFor={switchId} className="text-[var(--text-sm)] font-medium text-[var(--color-text)] cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
      )}
      <Primitive.Root
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="oq-switch"
      >
        <Primitive.Thumb className="oq-switch__thumb" />
      </Primitive.Root>
    </div>
  );
}
