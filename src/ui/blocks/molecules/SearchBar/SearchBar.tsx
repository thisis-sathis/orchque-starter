"use client";
// SearchBar.tsx — controlled search input with icon. Used in product nav + filter panels.
import React from "react";
import { Icon } from "@/ui/components/icon";
import { Input } from "@/ui/components/input";
import { cn } from "@/ui/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search…",
  className,
  disabled,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Icon
        name="Search"
        size="sm"
        aria-hidden="true"
        className="absolute left-[var(--space-3x)] text-[var(--color-text-muted)] pointer-events-none"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Search"
        className="pl-[calc(var(--space-3x)*2+16px)]"
      />
    </div>
  );
}
