"use client";
// Sidebar.tsx — product sidebar organism. Works for all 3 product themes (simple/basic/pro).
// Layout is CSS-class driven: .oq-layout-basic or .oq-layout-pro wraps this.
import React from "react";
import { NavItem, type NavItemProps } from "@/ui/blocks/molecules/NavItem";
import { UserMenu, type UserMenuAction } from "@/ui/blocks/molecules/UserMenu";
import { Icon } from "@/ui/components/icon";
import { Separator } from "@/ui/components/separator";
import { cn } from "@/ui/lib/utils";

export interface SidebarSection {
  heading?: string;
  items: Omit<NavItemProps, "collapsed" | "className">[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  logoText?: string;
  logoSrc?: string;
  user?: {
    name: string;
    email?: string;
    avatarSrc?: string;
  };
  userActions?: UserMenuAction[];
  className?: string;
}

export function Sidebar({
  sections,
  collapsed,
  onToggleCollapse,
  logoText,
  logoSrc,
  user,
  userActions = [],
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "oq-sidebar flex flex-col h-full overflow-hidden",
        "bg-[var(--color-sidebar,var(--color-surface))]",
        "border-r border-[var(--color-border)]",
        "transition-[width] duration-200 ease-in-out",
        collapsed
          ? "w-[var(--layout-sidebar-width-collapsed,64px)]"
          : "w-[var(--layout-sidebar-width-expanded,256px)]",
        className
      )}
    >
      {/* Header: logo + collapse toggle */}
      <div className="flex items-center justify-between h-[var(--layout-topnav-height,56px)] px-[var(--space-3x)] shrink-0">
        {!collapsed && (
          <a href="/" className="font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-md)] truncate">
            {logoSrc ? <img src={logoSrc} alt={logoText ?? "Logo"} className="h-6 w-auto" /> : logoText}
          </a>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-[var(--space-1x)] rounded-[var(--radius-md)] text-[var(--color-text-muted)]
              hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text)] transition-colors ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={collapsed ? "PanelLeftOpen" : "PanelLeftClose"} size="sm" aria-hidden="true" />
          </button>
        )}
      </div>

      <Separator />

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-[var(--space-3x)] px-[var(--space-2x)]" aria-label="Main navigation">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-[var(--space-4x)]">
            {section.heading && !collapsed && (
              <p className="px-[var(--space-2x)] mb-[var(--space-1x)] text-[var(--text-xs)] font-[var(--font-semibold)]
                uppercase tracking-[var(--tracking-wide)] text-[var(--color-text-muted)]">
                {section.heading}
              </p>
            )}
            <ul className="flex flex-col gap-[var(--space-1x)]" role="list">
              {section.items.map((item, iIdx) => (
                <li key={iIdx}>
                  <NavItem {...item} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <Separator />

      {/* User menu footer */}
      {user && (
        <div className="p-[var(--space-2x)] shrink-0">
          <UserMenu
            name={user.name}
            email={user.email}
            avatarSrc={user.avatarSrc}
            actions={userActions}
            collapsed={collapsed}
          />
        </div>
      )}
    </aside>
  );
}
