// EmptyTemplate.tsx - bare minimal layout. Just children in a centered container.
// Use for onboarding, blank canvas, full-page loading states.
import React from "react";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot } from "@/ui/lib/types";

export interface EmptyTemplateProps {
  centered?: boolean;
  /** Body slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
}

export function EmptyTemplate({ centered, content, children, className }: EmptyTemplateProps) {
  const { renderSlot } = require("@/ui/lib/render-component");
  return (
    <div
      className={cn(
        "min-h-screen bg-[var(--color-surface)]",
        centered && "flex items-center justify-center",
        className
      )}
    >
      {renderSlot(content ?? children)}
    </div>
  );
}