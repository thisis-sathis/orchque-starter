// InputOTP — one-time password input for 2FA, email verification, and auth flows.
"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { useContext } from "react";
import { cn } from "@/ui/lib/utils";

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

function OTPSlot({ index }: { index: number }) {
  const ctx = useContext(OTPInputContext);
  const slot = ctx.slots[index];
  return (
    <div
      className={cn(
        "oq-otp__slot",
        slot?.isActive && "oq-otp__slot--active"
      )}
    >
      {slot?.char ?? <span className="oq-otp__placeholder">○</span>}
      {slot?.hasFakeCaret && <div className="oq-otp__caret" />}
    </div>
  );
}

export function InputOTP({ length = 6, value, onChange, onComplete, disabled, className }: InputOTPProps) {
  const half = Math.floor(length / 2);
  const hasGroup = length > 4;

  return (
    <OTPInput
      maxLength={length}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
      containerClassName={cn("oq-otp", className)}
      render={({ slots }) => (
        <div className="oq-otp__inner">
          <div className="oq-otp__group">
            {slots.slice(0, hasGroup ? half : length).map((_, i) => (
              <OTPSlot key={i} index={i} />
            ))}
          </div>
          {hasGroup && (
            <>
              <span className="oq-otp__separator">—</span>
              <div className="oq-otp__group">
                {slots.slice(half).map((_, i) => (
                  <OTPSlot key={i + half} index={i + half} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    />
  );
}
