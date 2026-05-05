"use client";
// UserMenu.tsx — Avatar + name + dropdown menu molecule. Shown in sidebar footer and top nav.
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/ui/components/avatar";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface UserMenuAction {
  label: string;
  href?: string;
  onClick?: () => void;
  /** Shows item in danger/red styling */
  danger?: boolean;
}

export interface UserMenuProps {
  /** User's display name */
  name: string;
  /** User's email */
  email?: string;
  /** Avatar image URL (falls back to initials) */
  avatarSrc?: string;
  /** Menu actions (e.g. Settings, Sign out) */
  actions: UserMenuAction[];
  /** When collapsed (icon-only sidebar), only show avatar */
  collapsed?: boolean;
  className?: string;
}

export function UserMenu({ name, email, avatarSrc, actions, collapsed, className }: UserMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-[var(--space-2x)] w-full",
            "rounded-[var(--radius-md)] p-[var(--space-2x)]",
            "text-[var(--color-sidebar-text)] hover:bg-[var(--color-surface-overlay)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
            "transition-colors duration-150",
            collapsed && "justify-center",
            className
          )}
          aria-label="User menu"
        >
          <Avatar src={avatarSrc} name={name} size="sm" />
          {!collapsed && (
            <>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-[var(--text-sm)] font-[var(--font-medium)] truncate w-full">{name}</span>
                {email && (
                  <span className="text-[var(--text-xs)] text-[var(--color-text-muted)] truncate w-full">{email}</span>
                )}
              </div>
              <Icon name="ChevronDown" size="xs" aria-hidden="true" />
            </>
          )}
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[180px] overflow-hidden",
            "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
            "bg-[var(--color-surface)] shadow-[var(--shadow-lg)] p-[var(--space-1x)]",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {/* User info header */}
          <div className="px-[var(--space-2x)] py-[var(--space-2x)] border-b border-[var(--color-border)] mb-[var(--space-1x)]">
            <p className="text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--color-text)]">{name}</p>
            {email && <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{email}</p>}
          </div>

          {actions.map((action, i) => (
            <DropdownMenuPrimitive.Item
              key={i}
              className={cn(
                "flex cursor-pointer select-none items-center",
                "rounded-[var(--radius-md)] px-[var(--space-2x)] py-[var(--space-2x)]",
                "text-[var(--text-sm)] outline-none transition-colors",
                "focus:bg-[var(--color-surface-raised)]",
                action.danger
                  ? "text-[var(--color-failure)] focus:bg-[var(--color-failure-surface)]"
                  : "text-[var(--color-text)]"
              )}
              onSelect={() => {
                if (action.href) window.location.href = action.href;
                if (action.onClick) action.onClick();
              }}
            >
              {action.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
