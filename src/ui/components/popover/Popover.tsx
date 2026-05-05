// Popover - contextual floating panel anchored to a trigger element.
"use client";

import * as Primitive from "@radix-ui/react-popover";
import { cn } from "@/ui/lib/utils";

export type PopoverAlign = "start" | "center" | "end";
export type PopoverSide = "top" | "right" | "bottom" | "left";

import type { ComponentSlot, TriggerSlot } from "@/ui/lib/types";

export interface PopoverProps {
  /** Trigger slot - TriggerConfig JSON (data-driven) OR custom ReactNode. */
  trigger: TriggerSlot;
  /** Body slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: PopoverAlign;
  side?: PopoverSide;
  className?: string;
}

export function Popover({ trigger, content, children, open, onOpenChange, align = "center", side = "bottom", className }: PopoverProps) {
  const { renderSlot, renderTriggerSlot } = require("@/ui/lib/render-component");
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.Trigger asChild>{renderTriggerSlot(trigger)}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          align={align}
          side={side}
          sideOffset={8}
          className={cn("oq-popover", className)}
        >
          {renderSlot(content ?? children)}
          <Primitive.Arrow className="oq-popover__arrow" />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}