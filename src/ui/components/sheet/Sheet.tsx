// Sheet - slide-in side panel. Uses Dialog primitive with side positioning.
"use client";

import * as Primitive from "@radix-ui/react-dialog";
import { cn } from "@/ui/lib/utils";

export type SheetSide = "left" | "right" | "top" | "bottom";

import type { ComponentSlot, TriggerSlot } from "@/ui/lib/types";

export interface SheetProps {
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
  side?: SheetSide;
}

const SIDE_CLASSES: Record<SheetSide, string> = {
  left: "oq-sheet__content--left",
  right: "oq-sheet__content--right",
  top: "oq-sheet__content--top",
  bottom: "oq-sheet__content--bottom",
};

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  content,
  children,
  trigger,
  side = "right",
}: SheetProps) {
  const { renderSlot, renderTriggerSlot } = require("@/ui/lib/render-component");
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Primitive.Trigger asChild>
          {renderTriggerSlot(trigger)}
        </Primitive.Trigger>
      )}
      <Primitive.Portal>
        <Primitive.Overlay className="oq-sheet__overlay" />
        <Primitive.Content className={cn("oq-sheet__content", SIDE_CLASSES[side])}>
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
          <Primitive.Close className="oq-sheet__close" aria-label="Close panel">
            x
          </Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}