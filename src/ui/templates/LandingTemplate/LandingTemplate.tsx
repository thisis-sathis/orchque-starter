// LandingTemplate.tsx - full-page landing layout template.
// Composes: NavbarBlock + slot for sections + FooterBlock.
import React from "react";
import { NavbarBlock, type NavbarBlockProps } from "@/ui/blocks/organisms/landing/NavbarBlock";
import { FooterBlock, type FooterBlockProps } from "@/ui/blocks/organisms/landing/FooterBlock";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot } from "@/ui/lib/types";

export type LandingTheme =
  | "tech" | "health" | "green" | "glassmorphism"
  | "fun" | "minimal" | "bold" | "dark";

export interface LandingTemplateProps {
  theme?: LandingTheme;
  navbar: NavbarBlockProps;
  footer: FooterBlockProps;
  /** Sections slot - ComponentConfig JSON (data-driven) or ComponentSlot[] OR custom ReactNode. */
  content?: ComponentSlot | ComponentSlot[];
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
}

export function LandingTemplate({ theme, navbar, footer, content, children, className }: LandingTemplateProps) {
  const { renderSlot, renderSlots } = require("@/ui/lib/render-component");
  const body = content
    ? Array.isArray(content) ? renderSlots(content) : renderSlot(content)
    : children;
  return (
    <div
      className={cn("flex flex-col min-h-screen bg-[var(--color-surface)]", className)}
      data-theme={theme}
    >
      <NavbarBlock {...navbar} />
      <main className="flex-1 flex flex-col">
        {body}
      </main>
      <FooterBlock {...footer} />
    </div>
  );
}