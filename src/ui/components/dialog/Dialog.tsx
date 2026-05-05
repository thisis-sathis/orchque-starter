// Dialog - modal overlay with accessible focus trap. Used for forms, confirmations, and detail views.
"use client";

import * as Primitive from "@radix-ui/react-dialog";
import { cn } from "@/ui/lib/utils";

import type { ComponentSlot, TriggerSlot } from "@/ui/lib/types";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  /** Body slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  /** Trigger slot - TriggerConfig JSON (data-driven) OR custom ReactNode. */
  trigger?: TriggerSlot;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  children,
  trigger,
  size = "md",
  className,
}: DialogProps) {
  const { renderSlot, renderTriggerSlot } = require("@/ui/lib/render-component");
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Primitive.Trigger asChild>
          {renderTriggerSlot(trigger)}
        </Primitive.Trigger>
      )}
      <Primitive.Portal>
        <Primitive.Overlay className="oq-dialog__overlay" />
        <Primitive.Content className={cn("oq-dialog__content", SIZE_CLASSES[size], className)}>
          {title && (
            <Primitive.Title className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] mb-[var(--space-1x)]">
              {title}
            </Primitive.Title>
          )}
          {description && (
            <Primitive.Description className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[var(--space-4x)]">
              {description}
            </Primitive.Description>
          )}
          {renderSlot(content ?? children)}
          <Primitive.Close className="oq-dialog__close" aria-label="Close">
            x
          </Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}