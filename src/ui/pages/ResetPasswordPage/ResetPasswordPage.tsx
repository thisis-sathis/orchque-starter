"use client";
// ResetPasswordPage.tsx — password reset form page. AuthTemplate + new password form.
import React, { useState } from "react";
import { AuthTemplate } from "../../templates/AuthTemplate";
import { FormField } from "../../blocks/molecules/FormField";
import { Button } from "../../components/button";
import { cn } from "../../lib/utils";

export interface ResetPasswordPageProps {
  logoText?: string;
  logoSrc?: string;
  /** Called with the new password when form is submitted */
  onSubmit?: (password: string) => void;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  loginHref?: string;
  className?: string;
}

export function ResetPasswordPage({
  logoText,
  logoSrc,
  onSubmit,
  isLoading,
  errorMessage,
  successMessage,
  loginHref = "/login",
  className,
}: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMismatch(true);
      return;
    }
    setMismatch(false);
    onSubmit?.(password);
  };

  return (
    <AuthTemplate logoText={logoText} logoSrc={logoSrc} className={className}>
      <div className="flex flex-col gap-[var(--space-6x)]">
        <div className="flex flex-col gap-[var(--space-2x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)]">
            Set new password
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
            Choose a strong password for your account.
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
            id="rp-password"
            label="New password"
            required
            inputProps={{
              type: "password",
              value: password,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
              placeholder: "At least 8 characters",
              autoComplete: "new-password",
            }}
          />
          <FormField
            id="rp-confirm"
            label="Confirm password"
            required
            error={mismatch ? "Passwords do not match" : undefined}
            inputProps={{
              type: "password",
              value: confirm,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setConfirm(e.target.value); setMismatch(false); },
              placeholder: "Repeat password",
              autoComplete: "new-password",
            }}
          />

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving…" : "Reset password"}
          </Button>
        </form>

        <p className={cn("text-[var(--text-sm)] text-[var(--color-text-muted)] text-center")}>
          <a href={loginHref} className="text-[var(--color-primary)] hover:underline font-[var(--font-medium)]">
            Back to sign in
          </a>
        </p>
      </div>
    </AuthTemplate>
  );
}
