import { memo } from "react";
import { CalendarDays } from "lucide-react";
import { DATE_FILTERS } from "../../constants/analyticsColors";

function AnalyticsFilters({ value, onChange }) {
  return (
    <div className="flex w-full items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:w-auto">
      <CalendarDays className="ml-2 size-4 shrink-0 text-slate-400" />
      {DATE_FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={`min-h-11 shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
            value === filter.value
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default memo(AnalyticsFilters);
