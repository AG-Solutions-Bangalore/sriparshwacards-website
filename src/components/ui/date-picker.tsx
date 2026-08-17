import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DatePickerProps {
  date?: string;
  onDateChange?: (dateString: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  disablePastDates?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select wedding date",
  className,
  disabled = false,
  minDate,
  disablePastDates = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const effectiveMinDate = React.useMemo(() => {
    if (minDate) return minDate;
    if (disablePastDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return undefined;
  }, [minDate, disablePastDates]);

  const selectedDate = React.useMemo(() => {
    if (!date) return undefined;
    try {
      const parsed = parseISO(date);
      return isNaN(parsed.getTime()) ? undefined : parsed;
    } catch {
      return undefined;
    }
  }, [date]);

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      const formatted = format(day, "yyyy-MM-dd");
      onDateChange?.(formatted);
    } else {
      onDateChange?.("");
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between bg-transparent border-0 border-b border-outline-variant/40 dark:border-outline-variant/30 focus:border-primary dark:focus:border-primary px-0 py-2.5 font-body text-base text-left transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
            selectedDate
              ? "text-primary dark:text-on-surface"
              : "text-on-surface-variant/60",
            className,
          )}
        >
          <span>
            {selectedDate ? format(selectedDate, "dd MMMM yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-on-surface-variant shrink-0 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={effectiveMinDate ? (day) => day < effectiveMinDate : undefined}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
