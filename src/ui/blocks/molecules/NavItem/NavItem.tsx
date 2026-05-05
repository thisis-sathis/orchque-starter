// NavItem.tsx — single sidebar/topnav navigation link. Active state via data-active attribute (CSS-driven).
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface NavItemProps {
  /** Display label */
  label: string;
  /** lucide-react icon name */
  icon?: IconName;
  /** Navigation href */
  href: string;
  /** Whether this item is the current active route */
  isActive?: boolean;
  /** When sidebar is in collapsed (icon-only) mode, hide the label */
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ label, icon, href, isActive, collapsed, onClick, className }: NavItemProps) {
  return (
    <a
      href={href}
      data-active={isActive ? "true" : undefined}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "oq-nav-item flex items-center gap-[var(--space-3x)]",
        "px-[var(--space-3x)] py-[var(--space-2x)]",
        "rounded-[var(--radius-md)]",
        "text-[var(--text-sm)] font-[var(--font-medium)]",
        "text-[var(--color-sidebar-text)] transition-colors duration-150",
        "hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text)]",
        "data-[active=true]:bg-[var(--color-sidebar-active)] data-[active=true]:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        collapsed && "justify-center px-[var(--space-2x)]",
        className
      )}
      title={collapsed ? label : undefined}
    >
      {icon && <Icon name={icon} size="sm" aria-hidden="true" />}
      {!collapsed && <span className="oq-nav-label truncate">{label}</span>}
    </a>
  );
}
