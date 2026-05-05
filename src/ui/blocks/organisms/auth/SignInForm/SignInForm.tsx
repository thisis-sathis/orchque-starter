// SignInForm.tsx — sign-in form organism. POSTs to /api/auth/signin, redirects to /dashboard.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";

export interface SignInFormProps {
  /** Product/brand name shown as heading */
  productName: string;
  /** Redirect path after successful sign-in. Default: /dashboard */
  redirectTo?: string;
  /** Link to forgot-password page */
  forgotPasswordHref?: string;
  /** Link to sign-up page */
  signUpHref?: string;
  className?: string;
}

export function SignInForm({
  productName,
  redirectTo = "/dashboard",
  forgotPasswordHref = "/auth/forgot-password",
  signUpHref = "/auth/signup",
  className,
}: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(
          data.code === "email_not_verified"
            ? "Email not verified"
            : data.error || "Sign in failed",
          data.code === "email_not_verified" ? { description: data.error } : undefined
        );
        return;
      }
      toast.success("Signed in successfully");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
        {/* Heading */}
        <div className="text-center mb-[var(--space-8x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold,700)] text-[var(--color-text)]">
            {productName}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-[var(--space-1x)] text-[var(--text-sm)]">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div
          className={cn(
            "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
            "bg-[var(--color-surface-raised)] p-[var(--space-6x)]",
            "shadow-[var(--shadow-sm)]"
          )}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>
            {/* Email field */}
            <div className="flex flex-col gap-[var(--space-1x)]">
              <label htmlFor="signin-email" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="oq-auth-input"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-[var(--space-1x)]">
              <div className="flex items-center justify-between">
                <label htmlFor="signin-password" className="text-[var(--text-sm)] font-medium text-[var(--color-text)]">
                  Password
                </label>
                <Link
                  href={forgotPasswordHref}
                  className="text-[var(--text-xs)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="oq-auth-input"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="oq-auth-btn-primary"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-4x)]">
          Don&apos;t have an account?{" "}
          <Link href={signUpHref} className="text-[var(--color-text)] font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
