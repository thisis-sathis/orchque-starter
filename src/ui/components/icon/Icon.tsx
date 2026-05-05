// Icon.tsx — wraps lucide-react icons with Orchque size scale + accessibility enforcement.
// Rule: never hardcode icon names inline — pass as 'name' prop or use this component.
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/ui/lib/utils";

// Size scale: xs=12, sm=16, md=20, lg=24, xl=32
const SIZE_MAP = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof SIZE_MAP;

// Supported icon names — maps to lucide-react exports
export type IconName = keyof typeof LucideIcons;

interface IconProps extends Omit<LucideProps, "size"> {
  /** lucide-react icon name (e.g. "Zap", "Settings2", "LayoutDashboard") */
  name: IconName;
  /** Size from scale: xs(12) sm(16) md(20) lg(24) xl(32). Default: md */
  size?: IconSize;
  /** Required when icon conveys meaning — e.g. standalone action icon */
  "aria-label"?: string;
  className?: string;
}

export function Icon({ name, size = "md", className, "aria-label": ariaLabel, ...props }: IconProps) {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;

  if (!LucideIcon) {
    // Fail silently with a fallback — never crash the page for a missing icon
    return null;
  }

  const isDecorative = !ariaLabel;

  return (
    <LucideIcon
      size={SIZE_MAP[size]}
      className={cn("shrink-0", className)}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

import React from "react";
