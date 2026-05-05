// FormField.tsx — Label + Input/Textarea + error message molecule.
// The building block for every form in the product.
import React from "react";
import { Label } from "@/ui/components/label";
import { Input, type InputProps } from "@/ui/components/input";
import { Textarea, type TextareaProps } from "@/ui/components/textarea";
import { cn } from "@/ui/lib/utils";

interface FormFieldBaseProps {
  /** Field label text */
  label: string;
  /** HTML id — links label to input */
  id: string;
  /** Error message shown below the field */
  error?: string;
  /** Helper text shown below the field when no error */
  hint?: string;
  /** Marks field as required (shows * on label) */
  required?: boolean;
  className?: string;
}

type FormFieldInputProps = FormFieldBaseProps & {
  type?: "input";
  inputProps?: Omit<InputProps, "id" | "hasError">;
};

type FormFieldTextareaProps = FormFieldBaseProps & {
  type: "textarea";
  inputProps?: Omit<TextareaProps, "id" | "hasError">;
};

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps;

export function FormField({ label, id, error, hint, required, className, type = "input", inputProps }: FormFieldProps) {
  const hasError = !!error;

  return (
    <div className={cn("flex flex-col gap-[var(--space-1x)]", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      {type === "textarea" ? (
        <Textarea id={id} hasError={hasError} {...(inputProps as TextareaProps)} />
      ) : (
        <Input id={id} hasError={hasError} {...(inputProps as InputProps)} />
      )}

      {error && (
        <p className="text-[var(--text-xs)] text-[var(--color-failure)]" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{hint}</p>
      )}
    </div>
  );
}
