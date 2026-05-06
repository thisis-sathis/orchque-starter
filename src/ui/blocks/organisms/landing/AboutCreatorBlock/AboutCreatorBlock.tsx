// AboutCreatorBlock.tsx — Creator/founder section: image left, bio right.
import React from "react";
import { Icon, type IconName } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

export interface SocialLink {
  platform: "twitter" | "linkedin" | "github" | "website";
  href: string;
  label?: string;
}

const platformIcon: Record<string, IconName> = {
  twitter: "AtSign",
  linkedin: "Link",
  github: "Code2",
  website: "Globe",
};

export interface AboutCreatorBlockProps {
  heading?: string;
  name: string;
  role?: string;
  bio: string;
  imageSrc?: string;
  imageAlt?: string;
  socialLinks?: SocialLink[];
  highlights?: string[];
  className?: string;
}

export function AboutCreatorBlock({
  heading = "Meet the creator",
  name,
  role,
  bio,
  imageSrc,
  imageAlt,
  socialLinks = [],
  highlights = [],
  className,
}: AboutCreatorBlockProps) {
  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-8x)]">
        {heading && (
          <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)] text-center">
            {heading}
          </h2>
        )}
        <div className="flex flex-col md:flex-row gap-[var(--space-10x)] items-start">
          {/* Left: image */}
          <div className="flex-shrink-0 w-full md:w-64">
            <div className="rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-overlay)] aspect-square w-full md:w-64">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt ?? name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size="xl" className="text-[var(--color-text-subtle)]" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col gap-[var(--space-4x)] flex-1">
            <div>
              <h3 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">{name}</h3>
              {role && (
                <p className="text-[var(--text-sm)] text-[var(--color-primary)] font-[var(--font-semibold)]">{role}</p>
              )}
            </div>
            <p className="text-[var(--text-base)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
              {bio}
            </p>
            {highlights.length > 0 && (
              <ul className="flex flex-col gap-[var(--space-2x)]">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text)]">
                    <Icon name="CheckCircle" size="sm" className="text-[var(--color-success)] flex-shrink-0" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-[var(--space-3x)]">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label ?? link.platform}
                    className="w-9 h-9 rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    <Icon name={platformIcon[link.platform] ?? "Link"} size="sm" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
