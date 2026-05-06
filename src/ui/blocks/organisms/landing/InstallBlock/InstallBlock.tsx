"use client";
// InstallBlock.tsx — npm install command block with copy-to-clipboard button and "Copied!" state.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

interface InstallCommand {
  label: string;
  command: string;
  /** e.g. "npm" | "yarn" | "pnpm" | "bash" */
  manager?: string;
}

export interface InstallBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  commands?: InstallCommand[];
  /** Single command shorthand */
  command?: string;
  note?: string;
  className?: string;
}

const DEFAULT_COMMANDS: InstallCommand[] = [
  { label: "npm",  manager: "npm",  command: "npm install your-package" },
  { label: "yarn", manager: "yarn", command: "yarn add your-package" },
  { label: "pnpm", manager: "pnpm", command: "pnpm add your-package" },
];

export function InstallBlock({
  badge,
  heading,
  subheading,
  commands,
  command,
  note,
  className,
}: InstallBlockProps) {
  const tabs: InstallCommand[] = command
    ? [{ label: "bash", manager: "bash", command }]
    : (commands ?? DEFAULT_COMMANDS);

  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(tabs[activeIdx].command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may fail in some browsers */
    }
  }

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-2xl flex flex-col gap-[var(--space-8x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="text-center flex flex-col gap-[var(--space-3x)]">
            {badge && (
              <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                <Icon name="Terminal" size="xs" />
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)]">{subheading}</p>
            )}
          </div>
        )}

        {/* Code block */}
        <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-md font-mono">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e] border-b border-white/10">
            {/* Traffic lights */}
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />

            {/* Tabs (package manager switcher) */}
            {tabs.length > 1 && (
              <div className="ml-4 flex gap-1">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-semibold transition-colors",
                      idx === activeIdx
                        ? "bg-white/15 text-white"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="ml-auto flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-colors bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
              aria-label="Copy command"
            >
              {copied ? (
                <>
                  <Icon name="Check" size="xs" />
                  Copied!
                </>
              ) : (
                <>
                  <Icon name="Copy" size="xs" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Command line */}
          <div className="bg-[#13131e] px-6 py-5 flex items-center gap-3 overflow-x-auto">
            <span className="text-[#6272a4] select-none shrink-0">$</span>
            <span className="text-[#f8f8f2] text-sm whitespace-nowrap">
              <span className="text-[#50fa7b]">
                {tabs[activeIdx].manager ?? tabs[activeIdx].label}
              </span>{" "}
              <span className="text-[#8be9fd]">
                {tabs[activeIdx].command
                  .replace(/^(npm|yarn|pnpm|bash)\s+/i, "")
                  .replace(/^add\s+/, "add ")
                  .replace(/^install\s+/, "install ")}
              </span>
            </span>
          </div>
        </div>

        {note && (
          <p className="text-center text-xs text-[var(--color-text-muted)]">{note}</p>
        )}
      </div>
    </section>
  );
}
