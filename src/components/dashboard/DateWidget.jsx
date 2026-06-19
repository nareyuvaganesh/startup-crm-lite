import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export default function DateWidget() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full max-w-full items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:w-fit">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <CalendarDays className="size-4" strokeWidth={2.2} aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2.5 sm:justify-start">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
          {DATE_FORMATTER.format(now)}
        </p>
        <span className="h-4 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
        <p
          className="shrink-0 whitespace-nowrap text-sm font-medium tabular-nums text-gray-500 dark:text-gray-400"
          aria-label={`Current time ${TIME_FORMATTER.format(now)}`}
        >
          {TIME_FORMATTER.format(now)}
        </p>
      </div>
    </div>
  );
}
