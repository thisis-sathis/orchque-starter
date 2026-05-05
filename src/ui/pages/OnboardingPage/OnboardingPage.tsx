"use client";
// OnboardingPage.tsx — multi-step onboarding wizard page. EmptyTemplate + step card.
import React from "react";
import { EmptyTemplate } from "@/ui/templates/EmptyTemplate";
import { Button } from "@/ui/components/button";
import { cn } from "@/ui/lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export interface OnboardingPageProps {
  logoText?: string;
  logoSrc?: string;
  steps: OnboardingStep[];
  currentStep: number;
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function OnboardingPage({
  logoText,
  logoSrc,
  steps,
  currentStep,
  onNext,
  onBack,
  onSkip,
  nextLabel = "Continue",
  isLoading,
  className,
}: OnboardingPageProps) {
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <EmptyTemplate centered className={className}>
      <div className="w-full max-w-lg mx-auto px-[var(--space-4x)] py-[var(--space-12x)]">
        {/* Logo */}
        {(logoText || logoSrc) && (
          <div className="text-center mb-[var(--space-8x)]">
            <a href="/" className="font-[var(--font-bold)] text-[var(--color-primary)] text-[var(--text-xl)]">
              {logoSrc ? <img src={logoSrc} alt={logoText ?? "Logo"} className="h-8 w-auto mx-auto" /> : logoText}
            </a>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-[var(--space-8x)]">
          <div className="flex items-center justify-between mb-[var(--space-2x)]">
            <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
              Step {currentStep + 1} of {steps.length}
            </span>
            {onSkip && !isLast && (
              <button
                onClick={onSkip}
                className="text-[var(--text-xs)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                Skip
              </button>
            )}
          </div>
          <div className="h-1 w-full bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Step card */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-[var(--space-8x)]">
          <h1 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-text)] mb-[var(--space-2x)]">
            {step?.title}
          </h1>
          {step?.description && (
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-[var(--space-6x)]">
              {step.description}
            </p>
          )}
          <div className="mb-[var(--space-6x)]">{step?.content}</div>

          <div className="flex items-center justify-between gap-[var(--space-3x)]">
            {currentStep > 0 ? (
              <Button variant="ghost" onClick={onBack} disabled={isLoading}>Back</Button>
            ) : <div />}
            <Button onClick={onNext} disabled={isLoading} className="ml-auto">
              {isLoading ? "Please wait…" : isLast ? "Get started" : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </EmptyTemplate>
  );
}
