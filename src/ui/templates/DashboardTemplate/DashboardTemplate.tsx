"use client";
// DashboardTemplate.tsx - product dashboard layout template.
// Supports all 3 product themes via CSS class on wrapper. Sidebar + main content area.
import React, { useState } from "react";
import { Sidebar, type SidebarProps } from "@/ui/blocks/organisms/product/Sidebar";
import { TopNav, type TopNavProps } from "@/ui/blocks/organisms/product/TopNav";
import { cn } from "@/ui/lib/utils";
import type { ComponentSlot } from "@/ui/lib/types";

export type ProductTheme = "simple" | "basic" | "pro";

export interface DashboardTemplateProps {
  theme?: ProductTheme;
  sidebar: Omit<SidebarProps, "collapsed" | "onToggleCollapse">;
  topNav?: Omit<TopNavProps, "onMobileMenuToggle">;
  /** Main area slot - ComponentConfig JSON (data-driven) OR custom ReactNode. */
  content?: ComponentSlot;
  /** Backward-compat alias for content */
  children?: React.ReactNode;
  className?: string;
}

const THEME_CLASS: Record<ProductTheme, string> = {
  simple: "oq-layout-simple",
  basic: "oq-layout-basic",
  pro: "oq-layout-pro",
};

export function DashboardTemplate({
  theme = "basic",
  sidebar,
  topNav,
  content,
  children,
  className,
}: DashboardTemplateProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { renderSlot } = require("@/ui/lib/render-component");

  const layoutClass = THEME_CLASS[theme];
  const body = renderSlot(content ?? children);

  if (theme === "simple") {
    return (
      <div className={cn(layoutClass, "flex flex-col min-h-screen", className)}>
        {topNav && (
          <TopNav
            {...topNav}
            onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          />
        )}
        <main className="flex-1 overflow-y-auto p-[var(--space-6x)]">
          {body}
        </main>
      </div>
    );
  }

  return (
    <div className={cn(layoutClass, "flex min-h-screen", className)}>
      <div
        className={cn(
          "shrink-0",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40",
          "max-md:transition-transform max-md:duration-200",
          mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
        )}
      >
        <Sidebar
          {...sidebar}
          collapsed={theme === "basic" ? collapsed : false}
          onToggleCollapse={theme === "basic" ? () => setCollapsed(!collapsed) : undefined}
        />
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {topNav && (
          <TopNav
            {...topNav}
            onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
          />
        )}
        <main className="flex-1 overflow-y-auto p-[var(--space-6x)]">
          {body}
        </main>
      </div>
    </div>
  );
}