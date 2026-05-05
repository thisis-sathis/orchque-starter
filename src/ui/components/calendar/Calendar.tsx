// Calendar — month grid for selecting single or range dates. Powered by react-day-picker.
"use client";

import { DayPicker } from "react-day-picker";
import { cn } from "@/ui/lib/utils";

export type CalendarMode = "single" | "range" | "multiple";

export interface CalendarProps {
  mode?: CalendarMode;
  selected?: Date | Date[] | { from?: Date; to?: Date };
  onSelect?: (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => void;
  disabled?: Date[] | ((date: Date) => boolean);
  fromDate?: Date;
  toDate?: Date;
  className?: string;
}

export function Calendar({ mode = "single", selected, onSelect, disabled, fromDate, toDate, className }: CalendarProps) {
  return (
    <DayPicker
      mode={mode as "single"}
      selected={selected as Date}
      onSelect={onSelect as (date: Date | undefined) => void}
      disabled={disabled}
      fromDate={fromDate}
      toDate={toDate}
      showOutsideDays
      classNames={{
        root: cn("oq-calendar", className),
        months: "oq-calendar__months",
        month: "oq-calendar__month",
        caption: "oq-calendar__caption",
        caption_label: "oq-calendar__caption-label",
        nav: "oq-calendar__nav",
        nav_button: "oq-calendar__nav-btn",
        nav_button_previous: "oq-calendar__nav-btn--prev",
        nav_button_next: "oq-calendar__nav-btn--next",
        table: "oq-calendar__table",
        head_row: "oq-calendar__head-row",
        head_cell: "oq-calendar__head-cell",
        row: "oq-calendar__row",
        cell: "oq-calendar__cell",
        day: "oq-calendar__day",
        day_selected: "oq-calendar__day--selected",
        day_today: "oq-calendar__day--today",
        day_outside: "oq-calendar__day--outside",
        day_disabled: "oq-calendar__day--disabled",
        day_range_middle: "oq-calendar__day--range-middle",
        day_hidden: "invisible",
      }}
    />
  );
}
