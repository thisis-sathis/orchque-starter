// ForgotPasswordForm.tsx — password reset request form. POSTs to /api/auth/reset-password.
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";

export interface ForgotPasswordFormProps {
  productName: string;
  signInHref?: string;
  className?: string;
}

export function ForgotPasswordForm({
  productName,
  signInHref = "/auth/signin",
  className,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Always show success — don't reveal whether email exists (security)
      setSent(true);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center",
          "bg-[var(--color-surface)] px-[var(--space-4x)]",
          className
        )}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-[var(--space-4x)]" role="img" aria-label="Email icon">✉️</div>
          <h2 className="text-[var(--text-xl)] font-[var(--font-bold,700)] text-[var(--color-text)] mb-[var(--space-2x)]">
            Check your email
          </h2>
          <p className="text-[var(--color-text-muted)] text-[var(--text-sm)]">
            If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
          </p>
          <Link
            href={signInHref}
            className="mt-[var(--space-6x)] inline-block text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center",
        "bg-[var(--color-surface)] px-[var(--space-4x)]",
        className
      )}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-[var(--space-8x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold,700)] text-[var(--color-text)]">
            {productName}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-[var(--space-1x)] text-[var(--text-sm)]">
            Reset your password
          </p>
        </div>

        <div
          className={cn(
            "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
            "bg-[var(--color-surface-raised)] p-[var(--space-6x)]",
            "shadow-[var(--shadow-sm)]"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>
            <div className="flex flex-col gap-[var(--space-1x)]">
              <label htmlFor="forgot-email" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="oq-auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="oq-auth-btn-primary"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </div>

        <p className="text-center text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-4x)]">
          <Link href={signInHref} className="text-[var(--color-text)] font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
