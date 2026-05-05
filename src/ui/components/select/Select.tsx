"use client";
// Select.tsx — Radix Select atom. Styled with token CSS vars.
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export const SelectRoot = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { hasError?: boolean }
>(({ className, children, hasError, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between gap-[var(--space-2x)]",
      "rounded-[var(--radius-md)] border border-[var(--color-border)]",
      "bg-[var(--color-surface)] text-[var(--color-text)]",
      "px-[var(--space-3x)] text-[var(--text-base)]",
      "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1",
      "disabled:opacity-40 disabled:pointer-events-none",
      "placeholder:text-[var(--color-text-subtle)]",
      hasError && "border-[var(--color-failure)] focus:ring-[var(--color-failure)]",
      className
    )}
    aria-invalid={hasError ? "true" : undefined}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon name="ChevronDown" size="sm" aria-hidden="true" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-md)]",
        "animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-[var(--space-1x)]">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center",
      "rounded-[var(--radius-md)] py-[var(--space-2x)] pl-[var(--space-8x)] pr-[var(--space-2x)]",
      "text-[var(--text-base)] text-[var(--color-text)]",
      "focus:bg-[var(--color-surface-raised)] focus:outline-none",
      "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name="Check" size="xs" aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

// Convenience re-export as a namespace
export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
};
