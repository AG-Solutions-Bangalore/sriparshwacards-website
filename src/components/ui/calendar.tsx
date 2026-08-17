import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "../../lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 font-body bg-surface text-on-surface rounded-sm border border-outline-variant/20 shadow-md", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "text-sm font-serif font-semibold text-primary",
        nav: "space-x-1 flex items-center justify-between absolute w-full px-1",
        button_previous:
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-surface-container rounded-sm transition-colors inline-flex items-center justify-center cursor-pointer text-primary",
        button_next:
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-surface-container rounded-sm transition-colors inline-flex items-center justify-center cursor-pointer text-primary",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-on-surface-variant rounded-sm w-9 font-label font-medium text-[0.75rem] uppercase tracking-wider text-center",
        weeks: "flex flex-col space-y-1 mt-2",
        week: "flex w-full",
        day: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button:
          "h-9 w-9 p-0 font-body text-xs font-normal hover:bg-surface-container rounded-sm transition-colors cursor-pointer text-on-surface inline-flex items-center justify-center",
        selected:
          "bg-primary text-on-primary hover:bg-primary hover:text-on-primary focus:bg-primary focus:text-on-primary font-semibold rounded-sm",
        today: "border border-secondary dark:border-primary text-primary font-bold rounded-sm",
        outside: "text-on-surface-variant/40 opacity-50",
        disabled: "text-on-surface-variant/30 opacity-40 cursor-not-allowed",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
