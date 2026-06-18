import { memo } from "react";
import { ChartNoAxesCombined } from "lucide-react";

function EmptyAnalyticsState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        <ChartNoAxesCombined className="size-6" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No analytics for this period</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">Add leads or choose a wider date range to see performance insights.</p>
    </div>
  );
}
export default memo(EmptyAnalyticsState);
