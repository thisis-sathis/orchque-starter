// AlertDialog - modal for destructive action confirmation with cancel and confirm buttons.
"use client";

import * as Primitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/ui/lib/utils";

import type { TriggerSlot } from "@/ui/lib/types";

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** Trigger slot - TriggerConfig JSON (data-driven) OR custom ReactNode. */
  trigger?: TriggerSlot;
  destructive?: boolean;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  trigger,
  destructive = false,
}: AlertDialogProps) {
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Primitive.Trigger asChild>
          {(() => { const { renderTriggerSlot } = require("@/ui/lib/render-component"); return renderTriggerSlot(trigger); })()}
        </Primitive.Trigger>
      )}
      <Primitive.Portal>
        <Primitive.Overlay className="oq-alert-dialog__overlay" />
        <Primitive.Content className="oq-alert-dialog__content">
          <Primitive.Title className="text-[var(--text-base)] font-semibold text-[var(--color-text)]">
            {title}
          </Primitive.Title>
          {description && (
            <Primitive.Description className="mt-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text-muted)]">
              {description}
            </Primitive.Description>
          )}
          <div className="flex justify-end gap-[var(--space-2x)] mt-[var(--space-6x)]">
            <Primitive.Cancel className="oq-alert-dialog__cancel">
              {cancelLabel}
            </Primitive.Cancel>
            <Primitive.Action
              onClick={onConfirm}
              className={cn("oq-alert-dialog__confirm", destructive && "oq-alert-dialog__confirm--destructive")}
            >
              {confirmLabel}
            </Primitive.Action>
          </div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}