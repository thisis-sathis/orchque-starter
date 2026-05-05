// OqPhoto.tsx — photo/gallery image atom. next/image with caption, aspect ratio, lightbox-ready.
import React from "react";
import NextImage from "next/image";
import { cn } from "../../lib/utils";

export interface OqPhotoProps {
  /** Image source URL */
  src: string;
  /** Accessible alt text. Required — describe the image. */
  alt: string;
  /** Optional visible caption below the image */
  caption?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  /** CSS aspect ratio. Default: auto (uses width/height) */
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "9/16";
  /** Fit mode for object-fit. Default: cover */
  fit?: "cover" | "contain" | "fill";
  /** Rounded corners. Default: md */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "9/16": "aspect-[9/16]",
};

const FIT_CLASSES: Record<string, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
};

export function OqPhoto({
  src,
  alt,
  caption,
  width,
  height,
  fill,
  priority,
  aspectRatio,
  fit = "cover",
  radius = "md",
  className,
}: OqPhotoProps) {
  return (
    <figure className={cn("flex flex-col gap-[var(--space-2x)]", className)}>
      <div
        className={cn(
          "overflow-hidden",
          `rounded-[var(--radius-${radius})]`,
          aspectRatio && ASPECT_CLASSES[aspectRatio],
          "relative"
        )}
      >
        <NextImage
          src={src}
          alt={alt}
          width={fill ? undefined : (width ?? 800)}
          height={fill ? undefined : (height ?? 600)}
          fill={fill}
          priority={priority}
          className={cn("w-full h-full", FIT_CLASSES[fit])}
        />
      </div>
      {caption && (
        <figcaption className="text-[var(--text-xs)] text-[var(--color-text-muted)] text-center leading-[var(--leading-normal)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
