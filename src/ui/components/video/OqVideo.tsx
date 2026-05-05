// OqVideo.tsx — video player atom. Wraps HTML5 <video> with consistent styling + accessibility.
import React from "react";
import { cn } from "../../lib/utils";

export interface OqVideoProps {
  /** Video source URL */
  src: string;
  /** Poster image shown before playback */
  poster?: string;
  /** Accessible label describing the video content */
  title: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  /** CSS aspect ratio class. Default: 16/9 */
  aspectRatio?: "16/9" | "4/3" | "1/1" | "9/16";
  /** Fills the container width */
  fill?: boolean;
  className?: string;
}

const ASPECT_CLASSES: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
};

export function OqVideo({
  src,
  poster,
  title,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  aspectRatio = "16/9",
  fill = false,
  className,
}: OqVideoProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)]",
        !fill && ASPECT_CLASSES[aspectRatio],
        fill && "w-full h-full",
        className
      )}
    >
      <video
        src={src}
        poster={poster}
        title={title}
        aria-label={title}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
