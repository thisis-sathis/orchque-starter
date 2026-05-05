"use client";
// Tooltip.tsx — Radix tooltip atom for brief contextual hints.
import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/ui/lib/utils";

// Wrap your app root with this provider once
export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  /** The element that triggers the tooltip on hover/focus */
  children: React.ReactNode;
  /** Tooltip text — plain string only (data-driven, no JSX) */
  content: string;
  /** Side the tooltip appears on. Default: top */
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

export function Tooltip({ children, content, side = "top", delayDuration = 300 }: TooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={4}
          className={cn(
            "z-50 overflow-hidden rounded-[var(--radius-md)]",
            "bg-[var(--color-text)] text-[var(--color-surface)]",
            "px-[var(--space-2x)] py-[var(--space-1x)]",
            "text-[var(--text-xs)]",
            "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--color-text)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
