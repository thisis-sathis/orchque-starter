"use client";
// ForgotPasswordPage.tsx — forgot password request page. AuthTemplate + email form.
import React, { useState } from "react";
import { AuthTemplate } from "../../templates/AuthTemplate";
import { FormField } from "../../blocks/molecules/FormField";
import { Button } from "../../components/button";
import { cn } from "../../lib/utils";

export interface ForgotPasswordPageProps {
  logoText?: string;
  logoSrc?: string;
  onSubmit?: (email: string) => void;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loginHref?: string;
  className?: string;
}

export function ForgotPasswordPage({
  logoText,
  logoSrc,
  onSubmit,
  isLoading,
  errorMessage,
  successMessage,
  loginHref = "/login",
  className,
}: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };

  return (
    <AuthTemplate logoText={logoText} logoSrc={logoSrc} className={className}>
      <div className="flex flex-col gap-[var(--space-6x)]">
        <div className="flex flex-col gap-[var(--space-2x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">
            Forgot your password?
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="text-[var(--text-sm)] text-[var(--color-failure)] bg-[var(--color-failure-surface)] px-[var(--space-3x)] py-[var(--space-2x)] rounded-[var(--radius-md)]"
          >
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p
            role="status"
            className="text-[var(--text-sm)] text-[var(--color-success)] bg-[var(--color-success-surface)] px-[var(--space-3x)] py-[var(--space-2x)] rounded-[var(--radius-md)]"
          >
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4x)]" noValidate>
          <FormField
            id="fp-email"
            label="Email address"
            required
            inputProps={{
              type: "email",
              value: email,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
              placeholder: "you@example.com",
              autoComplete: "email",
            }}
          />

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending…" : "Send reset link"}
          </Button>
        </form>

        <p className={cn("text-[var(--text-sm)] text-[var(--color-text-muted)] text-center")}>
          Remember your password?{" "}
          <a href={loginHref} className="text-[var(--color-primary)] hover:underline font-[var(--font-medium)]">
            Sign in
          </a>
        </p>
      </div>
    </AuthTemplate>
  );
}
