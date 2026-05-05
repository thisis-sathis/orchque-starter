"use client";
// TopNav.tsx — product top navigation bar organism. Used in simple theme + pro theme header.
import React from "react";
import { Avatar } from "@/ui/components/avatar";
import { Button } from "@/ui/components/button";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface TopNavAction {
  icon: IconName;
  label: string;
  onClick?: () => void;
  badge?: number;
}

export interface TopNavProps {
  /** Page title or breadcrumb text */
  title?: string;
  logoText?: string;
  logoSrc?: string;
  /** Right-side icon action buttons */
  actions?: TopNavAction[];
  user?: {
    name: string;
    avatarSrc?: string;
    onClick?: () => void;
  };
  /** For mobile: hamburger to toggle sidebar */
  onMobileMenuToggle?: () => void;
  className?: string;
}

export function TopNav({
  title,
  logoText,
  logoSrc,
  actions = [],
  user,
  onMobileMenuToggle,
  className,
}: TopNavProps) {
  return (
    <header
      className={cn(
        "oq-topnav flex items-center justify-between",
        "h-[var(--layout-topnav-height,56px)] px-[var(--space-4x)]",
        "border-b border-[var(--color-border)] bg-[var(--color-surface)]",
        "shrink-0",
        className
      )}
    >
      {/* Left: menu toggle (mobile) + logo/title */}
      <div className="flex items-center gap-[var(--space-3x)]">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-[var(--space-1x)] text-[var(--color-text-muted)]"
            aria-label="Toggle menu"
          >
            <Icon name="Menu" size="md" aria-hidden="true" />
          </button>
        )}
        {logoText && !title && (
          <a href="/" className="font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-md)]">
            {logoSrc ? <img src={logoSrc} alt={logoText} className="h-6 w-auto" /> : logoText}
          </a>
        )}
        {title && (
          <h1 className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)]">{title}</h1>
        )}
      </div>

      {/* Right: actions + user */}
      <div className="flex items-center gap-[var(--space-2x)]">
        {actions.map((action) => (
          <div key={action.label} className="relative">
            <button
              onClick={action.onClick}
              className="p-[var(--space-2x)] rounded-[var(--radius-md)] text-[var(--color-text-muted)]
                hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] transition-colors"
              aria-label={action.label}
            >
              <Icon name={action.icon} size="sm" aria-hidden="true" />
            </button>
            {action.badge != null && action.badge > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 px-[2px] rounded-full
                  bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center"
                aria-label={`${action.badge} notifications`}
              >
                {action.badge > 99 ? "99+" : action.badge}
              </span>
            )}
          </div>
        ))}

        {user && (
          <button
            onClick={user.onClick}
            className="flex items-center gap-[var(--space-2x)] rounded-[var(--radius-md)] px-[var(--space-2x)] py-[var(--space-1x)]
              hover:bg-[var(--color-surface-raised)] transition-colors"
            aria-label="User profile"
          >
            <Avatar src={user.avatarSrc} name={user.name} size="sm" />
          </button>
        )}
      </div>
    </header>
  );
}
