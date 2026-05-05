// Avatar.tsx — user avatar atom. Image with initials fallback. Sizes: sm/md/lg.
import React from "react";
import NextImage from "next/image";
import { cn } from "@/ui/lib/utils";

const SIZE_MAP = { sm: 24, md: 36, lg: 48 } as const;
type AvatarSize = keyof typeof SIZE_MAP;

export interface AvatarProps {
  /** Image URL. Falls back to initials if not provided or fails to load. */
  src?: string;
  /** Full name — used to generate initials fallback */
  name?: string;
  size?: AvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const px = SIZE_MAP[size];
  const initials = name ? getInitials(name) : "?";

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        "rounded-[var(--radius-full)] overflow-hidden",
        "bg-[var(--color-surface-overlay)] text-[var(--color-text-muted)]",
        "font-[var(--font-semibold)]",
        size === "sm" && "text-[var(--text-xs)] w-6 h-6",
        size === "md" && "text-[var(--text-sm)] w-9 h-9",
        size === "lg" && "text-[var(--text-base)] w-12 h-12",
        className
      )}
      aria-label={name ?? "User avatar"}
    >
      {src ? (
        <NextImage
          src={src}
          alt={name ?? "Avatar"}
          width={px}
          height={px}
          className="object-cover w-full h-full"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
