// OqImage.tsx — next/image wrapper that enforces alt prop and resolves config image paths.
// Rule: all images use this — never raw <img> tags, never missing alt.
import React from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/ui/lib/utils";

export interface OqImageProps extends Omit<NextImageProps, "alt"> {
  /** Alt text is required — never omit it. Use "" only for truly decorative images. */
  alt: string;
  className?: string;
}

export function OqImage({ alt, className, ...props }: OqImageProps) {
  return (
    <NextImage
      alt={alt}
      className={cn("max-w-full", className)}
      {...props}
    />
  );
}
