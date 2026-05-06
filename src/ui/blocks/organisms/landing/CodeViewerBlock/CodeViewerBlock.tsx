"use client";
// CodeViewerBlock.tsx — Multi-file code viewer with per-file copy and download-as-zip.
// Uses fflate for browser-side zip generation without a server.
import React, { useState } from "react";
import { Icon } from "@/ui/components/icon";
import { cn } from "@/ui/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CodeFile {
  filename: string;
  language?: string;
  content: string;
  /** Optional description shown in the file tab tooltip */
  description?: string;
}

export interface CodeViewerBlockProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  files: CodeFile[];
  zipFilename?: string;
  className?: string;
}

// ─── Syntax highlighter (no external dep) ────────────────────────────────────

function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>')
    .replace(/(#[^\n]*)/g, '<span class="hl-comment">$1</span>')
    .replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span class="hl-string">$1</span>'
    )
    .replace(
      /\b(import|export|from|const|let|var|function|return|interface|type|extends|default|if|else|class|new|async|await|for|while|true|false|null|undefined)\b/g,
      '<span class="hl-keyword">$1</span>'
    )
    .replace(
      /\b(string|number|boolean|void|React|Promise|Record|Array)\b/g,
      '<span class="hl-type">$1</span>'
    );
}

// ─── Language label ───────────────────────────────────────────────────────────

function langLabel(filename: string, lang?: string): string {
  if (lang) return lang;
  const ext = filename.split(".").pop() ?? "";
  const map: Record<string, string> = {
    tsx: "TSX", ts: "TS", jsx: "JSX", js: "JS",
    json: "JSON", css: "CSS", md: "MD", sh: "SH", env: "ENV",
  };
  return map[ext] ?? ext.toUpperCase();
}

// ─── Download ZIP (fflate, dynamic import to avoid SSR issues) ───────────────

async function downloadZip(files: CodeFile[], zipFilename: string) {
  const { zipSync, strToU8 } = await import("fflate");
  const zipped: Record<string, Uint8Array> = {};
  for (const f of files) {
    zipped[f.filename] = strToU8(f.content);
  }
  const blob = new Blob([zipSync(zipped).buffer as ArrayBuffer], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipFilename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CodeViewerBlock({
  badge,
  heading,
  subheading,
  files,
  zipFilename = "code-examples.zip",
  className,
}: CodeViewerBlockProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const activeFile = files[activeIdx];

  async function copyFile(idx: number) {
    await navigator.clipboard.writeText(files[idx].content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  async function handleDownloadZip() {
    setDownloading(true);
    try {
      await downloadZip(files, zipFilename);
    } finally {
      setDownloading(false);
    }
  }

  if (!files.length) return null;

  return (
    <section
      className={cn(
        "w-full px-[var(--landing-section-px)] py-[var(--landing-section-py)]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl flex flex-col gap-[var(--space-8x)]">
        {/* Header */}
        {(badge || heading || subheading) && (
          <div className="flex flex-col gap-[var(--space-3x)] text-center">
            {badge && (
              <span className="inline-flex self-center items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                <Icon name="Code2" size="xs" />
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-[var(--text-3xl)] font-[var(--font-bold)] text-[var(--color-text)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-[var(--text-md)] text-[var(--color-text-muted)] max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Code window */}
        <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-xl font-mono">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1b26] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />

            {/* File tabs (scrollable) */}
            <div className="ml-3 flex gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {files.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  title={file.description}
                  className={cn(
                    "flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                    idx === activeIdx
                      ? "bg-white/15 text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      idx === activeIdx ? "bg-white/20 text-white" : "bg-white/10 text-white/60"
                    )}
                  >
                    {langLabel(file.filename, file.language)}
                  </span>
                  {file.filename}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {/* Copy active file */}
              <button
                onClick={() => copyFile(activeIdx)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                {copiedIdx === activeIdx ? (
                  <><Icon name="Check" size="xs" /> Copied!</>
                ) : (
                  <><Icon name="Copy" size="xs" /> Copy</>
                )}
              </button>
              {/* Download ZIP */}
              <button
                onClick={handleDownloadZip}
                disabled={downloading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] text-[var(--color-text-on-primary)] transition-colors disabled:opacity-60"
              >
                {downloading ? (
                  <><Icon name="Loader" size="xs" /> Zipping…</>
                ) : (
                  <><Icon name="Download" size="xs" /> Download ZIP</>
                )}
              </button>
            </div>
          </div>

          {/* File info bar */}
          <div className="flex items-center gap-3 px-5 py-2 bg-[#13141f] border-b border-white/5">
            <span className="text-[11px] text-white/40">{activeFile.filename}</span>
            {activeFile.description && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-[11px] text-white/40 italic">{activeFile.description}</span>
              </>
            )}
            <span className="ml-auto text-[11px] text-white/30">
              {activeFile.content.split("\n").length} lines
            </span>
          </div>

          {/* Code content */}
          <div className="bg-[#0d0e1a] overflow-auto max-h-[520px]">
            <style>{`
              .hl-comment { color: #6272a4; font-style: italic; }
              .hl-string  { color: #a5d6ff; }
              .hl-keyword { color: #79c0ff; font-weight: 600; }
              .hl-type    { color: #d2a8ff; }
            `}</style>
            <table className="w-full text-sm leading-6">
              <tbody>
                {activeFile.content.split("\n").map((line, i) => (
                  <tr key={i} className="hover:bg-white/5 group">
                    <td className="select-none text-right pr-4 pl-4 py-0 text-[11px] text-white/20 w-10 align-top border-r border-white/5">
                      {i + 1}
                    </td>
                    <td
                      className="pl-5 pr-6 py-0 text-[#e2e8f0] whitespace-pre align-top"
                      dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* File list below — shows all files with individual copy */}
        {files.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors",
                  idx === activeIdx
                    ? "border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40"
                )}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="w-8 h-8 rounded-lg bg-[#0d0e1a] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#79c0ff]">
                    {langLabel(file.filename, file.language)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[var(--color-text)] truncate">
                    {file.filename}
                  </div>
                  {file.description && (
                    <div className="text-xs text-[var(--color-text-muted)] truncate">{file.description}</div>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); copyFile(idx); }}
                  className="shrink-0 rounded-md p-1.5 hover:bg-[var(--color-background)] transition-colors"
                  aria-label={`Copy ${file.filename}`}
                >
                  {copiedIdx === idx ? (
                    <Icon name="Check" size="xs" className="text-[var(--color-success)]" />
                  ) : (
                    <Icon name="Copy" size="xs" className="text-[var(--color-text-muted)]" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
