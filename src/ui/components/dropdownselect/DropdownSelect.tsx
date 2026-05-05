"use client";
// DropdownSelect.tsx — simplified dropdown select atom. Single-component API wrapping Radix Select.
// Use this for simple select needs. Use Select atom for full custom composition.
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Icon } from "../icon";
import { cn } from "../../lib/utils";

export interface DropdownSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownSelectGroup {
  label: string;
  options: DropdownSelectOption[];
}

export interface DropdownSelectProps {
  /** Flat list of options OR grouped options */
  options?: DropdownSelectOption[];
  groups?: DropdownSelectGroup[];
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

export function DropdownSelect({
  options,
  groups,
  value,
  onValueChange,
  defaultValue,
  placeholder = "Select an option",
  disabled,
  hasError,
  className,
}: DropdownSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        aria-invalid={hasError ? "true" : undefined}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-[var(--space-2x)]",
          "rounded-[var(--radius-md)] border border-[var(--color-border)]",
          "bg-[var(--color-surface)] text-[var(--color-text)]",
          "px-[var(--space-3x)] text-[var(--text-base)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1",
          "disabled:opacity-40 disabled:pointer-events-none",
          hasError && "border-[var(--color-failure)]",
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <Icon name="ChevronDown" size="sm" aria-hidden="true" />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden",
            "rounded-[var(--radius-md)] border border-[var(--color-border)]",
            "bg-[var(--color-surface)] shadow-[var(--shadow-md)]",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <SelectPrimitive.Viewport className="p-[var(--space-1x)]">
            {/* Flat options */}
            {options?.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  "flex items-center gap-[var(--space-2x)] px-[var(--space-3x)] py-[var(--space-1x)]",
                  "text-[var(--text-sm)] text-[var(--color-text)]",
                  "cursor-pointer select-none outline-none",
                  "rounded-[var(--radius-sm)]",
                  "focus:bg-[var(--color-surface-overlay)] focus:text-[var(--color-text)]",
                  "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="ml-auto">
                  <Icon name="Check" size="xs" aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}

            {/* Grouped options */}
            {groups?.map((group) => (
              <SelectPrimitive.Group key={group.label}>
                <SelectPrimitive.Label className="px-[var(--space-3x)] py-[var(--space-1x)] text-[var(--text-xs)] text-[var(--color-text-muted)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                  {group.label}
                </SelectPrimitive.Label>
                {group.options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      "flex items-center gap-[var(--space-2x)] px-[var(--space-3x)] py-[var(--space-1x)]",
                      "text-[var(--text-sm)] text-[var(--color-text)]",
                      "cursor-pointer select-none outline-none",
                      "rounded-[var(--radius-sm)]",
                      "focus:bg-[var(--color-surface-overlay)] focus:text-[var(--color-text)]",
                      "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
                    )}
                  >
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="ml-auto">
                      <Icon name="Check" size="xs" aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Group>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
