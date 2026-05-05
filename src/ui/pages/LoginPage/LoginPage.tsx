"use client";
// LoginPage.tsx — auth login page. AuthTemplate + form.
import React from "react";
import { AuthTemplate } from "@/ui/templates/AuthTemplate";
import { FormField } from "@/ui/blocks/molecules/FormField";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface LoginPageProps {
  logoText?: string;
  logoSrc?: string;
  title?: string;
  description?: string;
  signupHref?: string;
  forgotPasswordHref?: string;
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
  errorMessage?: string;
  className?: string;
}

export function LoginPage({
  logoText,
  logoSrc,
  title = "Sign in",
  description = "Enter your email and password",
  signupHref,
  forgotPasswordHref,
  onSubmit,
  isLoading,
  errorMessage,
  className,
}: LoginPageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    const fd = new FormData(e.currentTarget);
    onSubmit(String(fd.get("email") ?? ""), String(fd.get("password") ?? ""));
  };

  return (
    <AuthTemplate logoText={logoText} logoSrc={logoSrc} className={className}>
      <div className="flex flex-col gap-[var(--space-6x)]">
        <div>
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">{title}</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-1x)]">{description}</p>
        </div>

        {errorMessage && (
          <p className="text-[var(--text-sm)] text-[var(--color-failure)] p-[var(--space-3x)] rounded-[var(--radius-md)] bg-[var(--color-failure-surface)]">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]">
          <FormField
            id="login-email"
            label="Email"
            type="input"
            required
            inputProps={{ name: "email", type: "email", placeholder: "you@example.com", autoComplete: "email" }}
          />
          <div>
            <FormField
              id="login-password"
              label="Password"
              type="input"
              required
              inputProps={{ name: "password", type: "password", placeholder: "••••••••", autoComplete: "current-password" }}
            />
            {forgotPasswordHref && (
              <a
                href={forgotPasswordHref}
                className="text-[var(--text-xs)] text-[var(--color-primary)] hover:underline mt-[var(--space-1x)] block text-right"
              >
                Forgot password?
              </a>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        {signupHref && (
          <p className="text-center text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Don&apos;t have an account?{" "}
            <a href={signupHref} className="text-[var(--color-primary)] hover:underline font-[var(--font-medium)]">
              Sign up
            </a>
          </p>
        )}
      </div>
    </AuthTemplate>
  );
}
