// SignUpForm.tsx — sign-up form organism. POSTs to /api/auth/signup, shows email verification state.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";

export interface SignUpFormProps {
  productName: string;
  redirectTo?: string;
  signInHref?: string;
  termsHref?: string;
  privacyHref?: string;
  className?: string;
}

export function SignUpForm({
  productName,
  signInHref = "/auth/signin",
  termsHref = "/legal/terms",
  privacyHref = "/legal/privacy",
  className,
}: SignUpFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Sign up failed");
        return;
      }
      setDone(true);
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  /* --- Email verification sent state --- */
  if (done) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center",
          "bg-[var(--color-surface)] px-[var(--space-4x)]",
          className
        )}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-[var(--space-4x)]" role="img" aria-label="Email icon">📬</div>
          <h2 className="text-[var(--text-xl)] font-[var(--font-bold,700)] text-[var(--color-text)] mb-[var(--space-2x)]">
            Check your email
          </h2>
          <p className="text-[var(--color-text-muted)] text-[var(--text-sm)]">
            We&apos;ve sent a verification link to <strong>{email}</strong>.
            Click the link to activate your account.
          </p>
          <button
            onClick={() => {
              setDone(false);
              setEmail("");
              setPassword("");
              router.push(signInHref);
            }}
            className="mt-[var(--space-6x)] text-[var(--text-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline"
          >
            Back to sign in
          </button>
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
            Create your free account
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
              <label htmlFor="signup-email" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="oq-auth-input"
              />
            </div>

            <div className="flex flex-col gap-[var(--space-1x)]">
              <label htmlFor="signup-password" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className="oq-auth-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="oq-auth-btn-primary"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-4x)]">
          By creating an account you agree to our{" "}
          <Link href={termsHref} className="underline hover:text-[var(--color-text)]">Terms</Link>{" "}
          and{" "}
          <Link href={privacyHref} className="underline hover:text-[var(--color-text)]">Privacy Policy</Link>.
        </p>

        <p className="text-center text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-2x)]">
          Already have an account?{" "}
          <Link href={signInHref} className="text-[var(--color-text)] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
