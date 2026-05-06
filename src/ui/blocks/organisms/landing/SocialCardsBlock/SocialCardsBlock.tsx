"use client";
// SocialCardsBlock.tsx — Tab between Instagram / Twitter / Reddit views of same content.
// Shows how your product's output looks when shared on each platform.
import React, { useState } from "react";
import { cn } from "@/ui/lib/utils";

export type SocialPlatform = "twitter" | "instagram" | "reddit";

export interface SocialCard {
  platform: SocialPlatform;
  /** Content to show inside the card */
  content: string;
  /** Optional image shown in Instagram card */
  imageSrc?: string;
  username?: string;
  displayName?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface SocialCardsBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  cards: SocialCard[];
  className?: string;
}

const PLATFORMS: { key: SocialPlatform; label: string; color: string }[] = [
  { key: "twitter",   label: "X / Twitter",  color: "#000000" },
  { key: "instagram", label: "Instagram",    color: "#E1306C" },
  { key: "reddit",    label: "Reddit",       color: "#FF4500" },
];

function TwitterCard({ card }: { card: SocialCard }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-5x)] max-w-sm mx-auto flex flex-col gap-[var(--space-3x)] shadow-[var(--shadow-md)]">
      <div className="flex items-center gap-[var(--space-3x)]">
        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center font-[var(--font-bold)] text-[var(--color-text-muted)]">
          {(card.displayName ?? "U").charAt(0)}
        </div>
        <div>
          <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">{card.displayName ?? "Your Name"}</p>
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{card.username ?? "@yourhandle"}</p>
        </div>
        <div className="ml-auto">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[var(--color-text)]" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>
      <p className="text-[var(--text-sm)] text-[var(--color-text)] leading-[var(--leading-relaxed)] whitespace-pre-line">{card.content}</p>
      <div className="flex items-center gap-[var(--space-6x)] text-[var(--color-text-muted)] text-[var(--text-xs)] pt-[var(--space-2x)] border-t border-[var(--color-border)]">
        <span>💬 {card.comments ?? 12}</span>
        <span>🔁 {card.shares ?? 34}</span>
        <span>❤️ {card.likes ?? 182}</span>
      </div>
    </div>
  );
}

function InstagramCard({ card }: { card: SocialCard }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] max-w-sm mx-auto overflow-hidden shadow-[var(--shadow-md)]">
      {card.imageSrc ? (
        <img src={card.imageSrc} alt="Post" className="w-full aspect-square object-cover" />
      ) : (
        <div className="w-full aspect-square bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
          <span className="text-[var(--text-4xl)]">📸</span>
        </div>
      )}
      <div className="p-[var(--space-4x)] flex flex-col gap-[var(--space-2x)]">
        <div className="flex items-center gap-[var(--space-4x)] text-[var(--text-xl)]">
          <span title="Like">❤️</span>
          <span title="Comment">💬</span>
          <span title="Share">📤</span>
        </div>
        <p className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-text)]">{card.likes ?? 421} likes</p>
        <p className="text-[var(--text-sm)] text-[var(--color-text)]">
          <span className="font-[var(--font-semibold)]">{card.username ?? "yourhandle"}</span>{" "}
          <span className="whitespace-pre-line">{card.content}</span>
        </p>
      </div>
    </div>
  );
}

function RedditCard({ card }: { card: SocialCard }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] max-w-sm mx-auto shadow-[var(--shadow-md)] overflow-hidden">
      {/* Vote column */}
      <div className="flex">
        <div className="w-10 bg-[var(--color-surface-raised)] flex flex-col items-center py-[var(--space-3x)] gap-[var(--space-1x)]">
          <span className="text-[var(--color-error)] text-lg leading-none">▲</span>
          <span className="text-[var(--text-xs)] font-[var(--font-bold)] text-[var(--color-text)]">{card.likes ?? 847}</span>
          <span className="text-[var(--color-text-muted)] text-lg leading-none">▼</span>
        </div>
        <div className="flex-1 p-[var(--space-4x)] flex flex-col gap-[var(--space-2x)]">
          <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
            Posted by u/{card.username ?? "yourhandle"} · r/SaaS
          </p>
          <p className="text-[var(--text-md)] font-[var(--font-semibold)] text-[var(--color-text)] leading-[var(--leading-snug)]">
            {card.content.split("\n")[0]}
          </p>
          {card.content.includes("\n") && (
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] leading-[var(--leading-relaxed)]">
              {card.content.split("\n").slice(1).join(" ")}
            </p>
          )}
          <div className="flex items-center gap-[var(--space-4x)] text-[var(--text-xs)] text-[var(--color-text-muted)]">
            <span>💬 {card.comments ?? 58} comments</span>
            <span>🔗 Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialCardsBlock({ badge, heading, subheading, cards, className }: SocialCardsBlockProps) {
  const [active, setActive] = useState<SocialPlatform>("twitter");

  const activeCard = cards.find((c) => c.platform === active);
  const availablePlatforms = PLATFORMS.filter((p) => cards.some((c) => c.platform === p.key));

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-3xl flex flex-col gap-[var(--space-10x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
            {badge && (
              <span className="inline-block mx-auto px-[var(--space-3x)] py-[var(--space-1x)] rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[var(--text-xs)] font-[var(--font-semibold)] uppercase tracking-[var(--tracking-wide)]">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)] leading-[var(--leading-tight)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        {/* Platform tabs */}
        <div className="flex gap-[var(--space-2x)] justify-center flex-wrap">
          {availablePlatforms.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={cn(
                "px-[var(--space-4x)] py-[var(--space-2x)] rounded-full text-[var(--text-sm)] font-[var(--font-semibold)] border transition-all",
                active === p.key
                  ? "bg-[var(--color-primary)] text-[var(--color-text-on-primary)] border-[var(--color-primary)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)]/60"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active card */}
        {activeCard && (
          <div className="animate-in fade-in duration-200">
            {active === "twitter"   && <TwitterCard   card={activeCard} />}
            {active === "instagram" && <InstagramCard card={activeCard} />}
            {active === "reddit"    && <RedditCard    card={activeCard} />}
          </div>
        )}
      </div>
    </section>
  );
}
