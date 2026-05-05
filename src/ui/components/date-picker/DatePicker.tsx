// DatePicker — date input that opens a calendar popover. Single date selection.
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Popover } from "@/ui/components/popover";
import { Calendar } from "@/ui/components/calendar";
import { cn } from "@/ui/lib/utils";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  dateFormat?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  fromDate,
  toDate,
  dateFormat = "PPP",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "oq-date-picker__trigger",
            !value && "oq-date-picker__trigger--placeholder",
            className
          )}
        >
          <span className="oq-date-picker__icon">📅</span>
          {value ? format(value, dateFormat) : placeholder}
        </button>
      }
    >
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => {
          onChange?.(date as Date | undefined);
          setOpen(false);
        }}
        fromDate={fromDate}
        toDate={toDate}
      />
    </Popover>
  );
}
