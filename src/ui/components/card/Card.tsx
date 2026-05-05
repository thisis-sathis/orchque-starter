// Card - surface container with optional header, content, and footer sections.
import React from "react";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot, ActionConfig } from "@/ui/lib/types";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  title?: string;
  description?: string;
  /**
   * Footer - accepts ActionConfig[] (data-driven buttons) OR custom ReactNode.
   * If ActionConfig[]: each action rendered as a Button via renderAction().
   * If ReactNode (custom JSX): rendered directly.
   */
  footer?: ActionConfig[] | React.ReactNode;
  /**
   * Body slot - accepts ComponentConfig JSON, ComponentConfig[], OR custom ReactNode.
   * If ComponentConfig: rendered via component registry.
   * If ReactNode (custom JSX): rendered directly.
   */
  content?: ComponentSlot | ComponentSlot[];
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
  padding?: CardPadding;
}

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: "",
  sm: "p-[var(--space-3x)]",
  md: "p-[var(--space-6x)]",
  lg: "p-[var(--space-8x)]",
};

export function Card({ title, description, footer, content, children, className, padding = "md" }: CardProps) {
  const renderContent = () => {
    const { renderSlot, renderSlots } = require("@/ui/lib/render-component");
    const slot = content ?? children;
    if (!slot) return null;
    if (Array.isArray(slot)) return renderSlots(slot as ComponentSlot[]);
    return renderSlot(slot);
  };

  const renderFooter = () => {
    if (!footer) return null;
    // ReactNode (custom JSX)
    if (!Array.isArray(footer)) return footer as React.ReactNode;
    if (!footer.length) return null;
    const { renderAction } = require("@/ui/lib/render-component");
    return (
      <div className="flex items-center gap-[var(--space-2x)]">
        {footer.map((action, i) => renderAction(action, undefined, i))}
      </div>
    );
  };

  return (
    <div className={cn("oq-card rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]", PADDING_CLASSES[padding], className)}>
      {(title || description) && (
        <div className="mb-[var(--space-4x)]">
          {title && <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)]">{title}</h3>}
          {description && <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-1x)]">{description}</p>}
        </div>
      )}
      {renderContent()}
      {footer && (
        <div className="mt-[var(--space-4x)] pt-[var(--space-4x)] border-t border-[var(--color-border)]">
          {renderFooter()}
        </div>
      )}
    </div>
  );
}