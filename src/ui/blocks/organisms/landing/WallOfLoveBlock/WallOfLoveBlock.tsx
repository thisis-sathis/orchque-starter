// WallOfLoveBlock.tsx — Masonry wall of testimonials rendered inside authentic
// social-platform card mockups (X/Twitter, Instagram, Reddit, Product Hunt, LinkedIn, email).
import React from "react";
import { cn } from "@/ui/lib/utils";

export interface WallOfLoveItem {
  name: string;
  handle?: string;
  avatar?: string;
  quote: string;
  source?: "twitter" | "instagram" | "reddit" | "linkedin" | "email" | "producthunt";
  /** For Instagram: optional gradient or image URL behind the "post" */
  imageSrc?: string;
  /** Simulated engagement counts — random-looking defaults applied if omitted */
  likes?: number;
  comments?: number;
  shares?: number;
  date?: string;
}

export interface WallOfLoveBlockProps {
  heading?: string;
  subheading?: string;
  items: WallOfLoveItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// ─── Avatar helper ────────────────────────────────────────────────────────────

function Avatar({ item }: { item: WallOfLoveItem }) {
  return item.avatar ? (
    <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
  ) : (
    <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-on-primary)] text-xs font-bold shrink-0">
      {item.name.charAt(0)}
    </div>
  );
}

// ─── Twitter / X card ─────────────────────────────────────────────────────────

function TwitterCard({ item }: { item: WallOfLoveItem }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-3 shadow-sm w-full">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar item={item} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)] truncate">{item.name}</p>
          {item.handle && (
            <p className="text-xs text-[var(--color-text-muted)] truncate">{item.handle}</p>
          )}
        </div>
        {/* X logo */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[var(--color-text)] shrink-0 mt-0.5" aria-label="X">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Quote */}
      <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-line">
        {item.quote}
      </p>

      {/* Engagement row */}
      <div className="flex items-center gap-5 text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
        <span>💬 {item.comments ?? 12}</span>
        <span>🔁 {item.shares ?? 34}</span>
        <span>❤️ {item.likes ?? 182}</span>
        {item.date && <span className="ml-auto">{item.date}</span>}
      </div>
    </div>
  );
}

// ─── Instagram card ───────────────────────────────────────────────────────────

function InstagramCard({ item }: { item: WallOfLoveItem }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar item={item} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)] truncate">{item.name}</p>
          {item.handle && (
            <p className="text-xs text-[var(--color-text-muted)] truncate">{item.handle}</p>
          )}
        </div>
        {/* Instagram gradient icon */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-label="Instagram">
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.233 8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0z" />
          <circle fill="url(#ig-grad)" cx="12" cy="12" r="3.5" />
        </svg>
      </div>

      {/* Simulated image / gradient post */}
      {item.imageSrc ? (
        <img src={item.imageSrc} alt="post" className="w-full aspect-square object-cover" />
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-accent)]/10 to-[var(--color-secondary)]/20 flex items-center justify-center">
          <span className="text-3xl select-none">📸</span>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-4 text-lg">
          <span title="Like">❤️</span>
          <span title="Comment">💬</span>
          <span title="Share">📤</span>
        </div>
        <p className="text-xs font-semibold text-[var(--color-text)]">{item.likes ?? 421} likes</p>
        <p className="text-xs text-[var(--color-text)] leading-relaxed">
          <span className="font-semibold">{item.handle ?? item.name}</span>{" "}
          {item.quote}
        </p>
        {item.date && <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">{item.date}</p>}
      </div>
    </div>
  );
}

// ─── Reddit card ──────────────────────────────────────────────────────────────

function RedditCard({ item }: { item: WallOfLoveItem }) {
  const lines = item.quote.split("\n");
  const title = lines[0];
  const body = lines.slice(1).join(" ");

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm w-full">
      <div className="flex">
        {/* Vote column */}
        <div className="w-10 bg-[color-mix(in_srgb,var(--color-surface)_85%,var(--color-border))] flex flex-col items-center py-4 gap-1 shrink-0">
          <span className="text-[#ff4500] text-base leading-none">▲</span>
          <span className="text-xs font-bold text-[var(--color-text)]">{item.likes ?? 847}</span>
          <span className="text-[var(--color-text-muted)] text-base leading-none">▼</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
          <p className="text-[10px] text-[var(--color-text-muted)]">
            Posted by u/{item.handle?.replace("@", "") ?? item.name.toLowerCase().replace(" ", "")} · r/SaaS
          </p>
          <p className="text-sm font-semibold text-[var(--color-text)] leading-snug">{title}</p>
          {body && (
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-4">{body}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mt-1">
            <span>💬 {item.comments ?? 58} comments</span>
            <span>🔗 Share</span>
            {item.date && <span className="ml-auto">{item.date}</span>}
          </div>
        </div>

        {/* Reddit logo */}
        <div className="pr-3 pt-3 shrink-0">
          <svg viewBox="0 0 20 20" className="w-4 h-4" aria-label="Reddit">
            <circle cx="10" cy="10" r="10" fill="#ff4500" />
            <path fill="white" d="M16.67 10a1.46 1.46 0 00-2.47-1 7.12 7.12 0 00-3.85-1.23l.65-3.08 2.13.45a1 1 0 101.07-1 1 1 0 00-.96.68l-2.38-.5a.27.27 0 00-.32.2l-.73 3.44a7.14 7.14 0 00-3.89 1.23 1.46 1.46 0 10-1.61 2.39 2.87 2.87 0 000 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 000-.44 1.46 1.46 0 00.61-1.18zM7.27 11a1 1 0 111 1 1 1 0 01-1-1zm5.58 2.71a3.58 3.58 0 01-2.85.87 3.58 3.58 0 01-2.85-.87.27.27 0 01.38-.38 3.27 3.27 0 002.47.65 3.27 3.27 0 002.47-.65.27.27 0 01.38.38zm-.22-1.71a1 1 0 111-1 1 1 0 01-1 1z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Product Hunt card ────────────────────────────────────────────────────────

function ProductHuntCard({ item }: { item: WallOfLoveItem }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-3 shadow-sm w-full">
      <div className="flex items-start gap-3">
        <Avatar item={item} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)] truncate">{item.name}</p>
          {item.handle && <p className="text-xs text-[var(--color-text-muted)] truncate">{item.handle}</p>}
        </div>
        {/* PH logo */}
        <svg viewBox="0 0 40 40" className="w-5 h-5 shrink-0" aria-label="Product Hunt">
          <circle cx="20" cy="20" r="20" fill="#DA552F" />
          <path fill="white" d="M22.22 20H17v-6h5.22a3 3 0 010 6zm0-9H14v18h3v-6h5.22a6 6 0 000-12z" />
        </svg>
      </div>
      <p className="text-sm text-[var(--color-text)] leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
        <span className="flex items-center gap-1 text-[#DA552F] font-semibold">▲ {item.likes ?? 24} upvotes</span>
        {item.date && <span className="ml-auto">{item.date}</span>}
      </div>
    </div>
  );
}

// ─── LinkedIn card ────────────────────────────────────────────────────────────

function LinkedInCard({ item }: { item: WallOfLoveItem }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-3 shadow-sm w-full">
      <div className="flex items-start gap-3">
        <Avatar item={item} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)] truncate">{item.name}</p>
          {item.handle && <p className="text-xs text-[var(--color-text-muted)] truncate">{item.handle}</p>}
        </div>
        {/* LinkedIn logo */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0077B5] shrink-0 mt-0.5" aria-label="LinkedIn">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </div>
      <p className="text-sm text-[var(--color-text)] leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
        <span>👍 {item.likes ?? 63}</span>
        <span>💬 {item.comments ?? 8} comments</span>
        {item.date && <span className="ml-auto">{item.date}</span>}
      </div>
    </div>
  );
}

// ─── Generic / email card ─────────────────────────────────────────────────────

function GenericCard({ item }: { item: WallOfLoveItem }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-3 shadow-sm w-full">
      {/* Big open-quote */}
      <span className="text-4xl leading-none text-[var(--color-primary)]/25 font-serif select-none">&ldquo;</span>
      <p className="text-sm text-[var(--color-text)] leading-relaxed -mt-3">{item.quote}</p>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <Avatar item={item} />
          <div>
            <p className="text-xs font-semibold text-[var(--color-text)]">{item.name}</p>
            {item.handle && <p className="text-xs text-[var(--color-text-muted)]">{item.handle}</p>}
          </div>
        </div>
        {item.source === "email" && (
          <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-background)] border border-[var(--color-border)] rounded px-2 py-0.5">
            ✉ email
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Card router ──────────────────────────────────────────────────────────────

function TestimonialCard({ item }: { item: WallOfLoveItem }) {
  switch (item.source) {
    case "twitter":     return <TwitterCard item={item} />;
    case "instagram":   return <InstagramCard item={item} />;
    case "reddit":      return <RedditCard item={item} />;
    case "producthunt": return <ProductHuntCard item={item} />;
    case "linkedin":    return <LinkedInCard item={item} />;
    default:            return <GenericCard item={item} />;
  }
}

// ─── Block ────────────────────────────────────────────────────────────────────

export function WallOfLoveBlock({
  heading = "Wall of love",
  subheading = "What our users are saying",
  items,
  columns = 3,
  className,
}: WallOfLoveBlockProps) {
  // Distribute items into columns (top-to-bottom masonry feel)
  const cols = Array.from({ length: columns }, (_, i) =>
    items.filter((_, idx) => idx % columns === i)
  );

  return (
    <section className={cn("w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]", className)}>
      <div className="mx-auto max-w-6xl flex flex-col gap-[var(--space-10x)]">
        {(heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-2x)]">
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

        <div
          className={cn(
            "grid gap-4 items-start",
            columns === 2 && "sm:grid-cols-2",
            columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((item, ii) => (
                <TestimonialCard key={ii} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
