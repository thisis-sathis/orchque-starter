"use client";
// SignupPage.tsx — auth signup page. AuthTemplate + form.
import React from "react";
import { AuthTemplate } from "@/ui/templates/AuthTemplate";
import { FormField } from "@/ui/blocks/molecules/FormField";
import { Button } from "@/ui/components/button";

export interface SignupPageProps {
  logoText?: string;
  logoSrc?: string;
  title?: string;
  description?: string;
  loginHref?: string;
  onSubmit?: (name: string, email: string, password: string) => void;
  isLoading?: boolean;
  errorMessage?: string;
  className?: string;
}

export function SignupPage({
  logoText,
  logoSrc,
  title = "Create account",
  description = "Get started for free",
  loginHref,
  onSubmit,
  isLoading,
  errorMessage,
  className,
}: SignupPageProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    const fd = new FormData(e.currentTarget);
    onSubmit(
      String(fd.get("name") ?? ""),
      String(fd.get("email") ?? ""),
      String(fd.get("password") ?? "")
    );
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
            id="signup-name"
            label="Full name"
            type="input"
            required
            inputProps={{ name: "name", type: "text", placeholder: "Jane Doe", autoComplete: "name" }}
          />
          <FormField
            id="signup-email"
            label="Email"
            type="input"
            required
            inputProps={{ name: "email", type: "email", placeholder: "you@example.com", autoComplete: "email" }}
          />
          <FormField
            id="signup-password"
            label="Password"
            type="input"
            required
            inputProps={{ name: "password", type: "password", placeholder: "Min. 8 characters", autoComplete: "new-password" }}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        {loginHref && (
          <p className="text-center text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <a href={loginHref} className="text-[var(--color-primary)] hover:underline font-[var(--font-medium)]">
              Sign in
            </a>
          </p>
        )}
      </div>
    </AuthTemplate>
  );
}
