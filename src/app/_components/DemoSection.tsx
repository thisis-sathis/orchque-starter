"use client";
// DemoSection.tsx — App-level interactive demo on the landing page.
// ✏️  THIS IS YOUR SAMPLE — edit this file to match your product's actual demo experience.
// It lives here (not in the UI kit) because it's product-specific, not a reusable primitive.
//
// Features:
//  - Chat input + simulated AI response
//  - Output tab switcher: "Preview" (natural language) ↔ "Code" (syntax-highlighted snippet)
//  - Suggested prompts
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
  code?: string;
  codeLanguage?: string;
}

interface DemoSectionProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  suggestedPrompts?: string[];
  responses?: Record<string, string>;
  codeResponses?: Record<string, { code: string; language: string }>;
  defaultResponse?: string;
  defaultCode?: string;
  defaultCodeLanguage?: string;
  className?: string;
}

// ─── Sample scripted responses ────────────────────────────────────────────────

const SAMPLE_RESPONSE =
  "Here's your landing page component ✨\n\nA complete, responsive layout with your brand colours, hero section, feature grid, and CTA. Just update product.config.json and you're live.";

const SAMPLE_CODE = `// HeroBlock.tsx — auto-generated
import { cn } from "@/ui/lib/utils";

interface HeroBlockProps {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroBlock({ headline, subheadline, ctaText, ctaHref }: HeroBlockProps) {
  return (
    <section className="w-full px-6 py-20 text-center flex flex-col items-center gap-6">
      <h1 className="text-5xl font-bold text-[var(--color-text)] leading-tight max-w-3xl">
        {headline}
      </h1>
      {subheadline && (
        <p className="text-lg text-[var(--color-text-muted)] max-w-xl">{subheadline}</p>
      )}
      <a
        href={ctaHref}
        className="rounded-lg bg-[var(--color-primary)] text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
      >
        {ctaText}
      </a>
    </section>
  );
}`;

const DEFAULT_PROMPTS = [
  "Build me a landing page for a fitness app",
  "Create a pricing section with 3 tiers",
  "Generate a dashboard layout",
];

// ─── Lightweight syntax highlighter (no external dep) ────────────────────────

function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/[^\n]*)/g, '<span style="color:#8b949e;font-style:italic">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#a5d6ff">$1</span>')
    .replace(/\b(import|export|from|const|let|var|function|return|interface|type|extends|default|if|else|class|new)\b/g, '<span style="color:#79c0ff;font-weight:600">$1</span>')
    .replace(/\b(string|number|boolean|void|null|undefined|React)\b/g, '<span style="color:#d2a8ff">$1</span>');
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DemoSection({
  heading = "See it in action",
  subheading = "Type a prompt and watch your product come to life instantly.",
  placeholder = "Describe what you want to build…",
  suggestedPrompts = DEFAULT_PROMPTS,
  responses = {},
  codeResponses = {},
  defaultResponse = SAMPLE_RESPONSE,
  defaultCode = SAMPLE_CODE,
  defaultCodeLanguage = "tsx",
  className,
}: DemoSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const getResponse = (prompt: string) => {
    const key = Object.keys(responses).find((k) => prompt.toLowerCase().includes(k.toLowerCase()));
    return key ? responses[key] : defaultResponse;
  };

  const getCode = (prompt: string) => {
    const key = Object.keys(codeResponses).find((k) => prompt.toLowerCase().includes(k.toLowerCase()));
    return key ? codeResponses[key] : { code: defaultCode, language: defaultCodeLanguage };
  };

  const send = (prompt: string) => {
    if (!prompt.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: prompt.trim() }]);
    setInput("");
    setLoading(true);
    setActiveTab("preview");
    // TODO: replace setTimeout with a real fetch/stream call
    setTimeout(() => {
      const { code, language } = getCode(prompt);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getResponse(prompt), code, codeLanguage: language },
      ]);
      setLoading(false);
    }, 1200);
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)] bg-[var(--color-surface-raised)]",
        className
      )}
    >
      <div className="mx-auto max-w-4xl flex flex-col gap-[var(--space-8x)]">
        {/* Heading */}
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

        {/* Chat + code window */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] overflow-hidden">

          {lastAssistant ? (
            <>
              {/* Tab bar */}
              <div className="flex items-center border-b border-[var(--color-border)] px-[var(--space-4x)] bg-[var(--color-surface)]">
                {(["preview", "code"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex items-center gap-[var(--space-2x)] px-[var(--space-4x)] py-[var(--space-3x)] text-[var(--text-xs)] font-[var(--font-semibold)] border-b-2 transition-colors",
                      activeTab === tab
                        ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                        : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    )}
                  >
                    <Icon name={tab === "preview" ? "MessageSquare" : "Code2"} size="xs" aria-hidden="true" />
                    {tab === "preview" ? "Preview" : "Code"}
                  </button>
                ))}
                {activeTab === "code" && lastAssistant.code && (
                  <button
                    onClick={() => navigator.clipboard.writeText(lastAssistant.code!)}
                    className="ml-auto flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors py-[var(--space-3x)] px-[var(--space-2x)]"
                  >
                    <Icon name="Copy" size="xs" aria-hidden="true" /> Copy
                  </button>
                )}
              </div>

              {/* Tab content */}
              <div className="min-h-[240px] max-h-[400px] overflow-y-auto">
                {activeTab === "preview" ? (
                  <div className="p-[var(--space-5x)] flex flex-col gap-[var(--space-4x)]">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex gap-[var(--space-3x)] items-start",
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[var(--text-xs)] font-[var(--font-semibold)]",
                          msg.role === "user" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-overlay)] text-[var(--color-text)]"
                        )}>
                          {msg.role === "user" ? "U" : "AI"}
                        </div>
                        <div className={cn(
                          "rounded-[var(--radius-lg)] px-[var(--space-4x)] py-[var(--space-3x)] text-[var(--text-sm)] max-w-[80%] whitespace-pre-line leading-[var(--leading-relaxed)]",
                          msg.role === "user" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-overlay)] text-[var(--color-text)]"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto" style={{ background: "#0d1117" }}>
                    <div className="flex items-center gap-[var(--space-2x)] px-[var(--space-5x)] pt-[var(--space-4x)] pb-[var(--space-2x)]" style={{ color: "#8b949e" }}>
                      <Icon name="FileCode2" size="xs" aria-hidden="true" />
                      <span className="text-[var(--text-xs)]">{lastAssistant.codeLanguage ?? "code"}</span>
                    </div>
                    <pre
                      className="px-[var(--space-5x)] pb-[var(--space-5x)] text-[13px] leading-relaxed font-mono whitespace-pre"
                      style={{ color: "#e6edf3" }}
                      dangerouslySetInnerHTML={{ __html: highlight(lastAssistant.code ?? "") }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="min-h-[280px] p-[var(--space-8x)] flex flex-col items-center justify-center gap-[var(--space-4x)]">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                <Icon name="Zap" size="md" className="text-white" aria-hidden="true" />
              </div>
              <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] text-center">
                Try a prompt — see the response <em>and</em> the generated code
              </p>
              <div className="flex flex-wrap gap-[var(--space-2x)] justify-center">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="px-[var(--space-3x)] py-[var(--space-1x)] rounded-full border border-[var(--color-border)] text-[var(--text-xs)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors bg-[var(--color-surface)]"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {loading && (
            <div className="border-t border-[var(--color-border)] px-[var(--space-5x)] py-[var(--space-3x)] flex items-center gap-[var(--space-2x)]">
              <div className="w-6 h-6 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--color-text)]">AI</div>
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-[var(--color-border)] p-[var(--space-3x)] flex gap-[var(--space-2x)] items-end bg-[var(--color-surface)]">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder={placeholder}
              className="flex-1 resize-none rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-[var(--space-3x)] py-[var(--space-2x)] text-[var(--text-sm)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[var(--color-primary)]/90 transition-colors flex-shrink-0"
            >
              <Icon name="SendHorizontal" size="sm" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

