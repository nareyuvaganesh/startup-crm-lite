import { memo } from "react";

function ActivityHeatmap({ data }) {
  const maxValue = Math.max(1, ...data.map((item) => item.value));
  const days = [...new Set(data.map((item) => item.day))];
  const periods = [...new Set(data.map((item) => item.period))];

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Activity Heatmap</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400">Lead activity by weekday and time block</p>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[430px]">
          <div className="grid grid-cols-[42px_repeat(6,1fr)] gap-2 text-center text-[10px] font-semibold text-slate-400">
            <span />
            {periods.map((period) => <span key={period}>{String(period * 4).padStart(2, "0")}:00</span>)}
          </div>
          <div className="mt-2 space-y-2">
            {days.map((day) => (
              <div key={day} className="grid grid-cols-[42px_repeat(6,1fr)] items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400">{day}</span>
                {data.filter((item) => item.day === day).map((item) => (
                  <div
                    key={`${day}-${item.period}`}
                    title={`${day} ${item.label}: ${item.value} activities`}
                    className="h-7 rounded-md bg-blue-600 transition-transform hover:scale-105"
                    style={{ opacity: item.value ? 0.18 + (item.value / maxValue) * 0.82 : 0.06 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
export default memo(ActivityHeatmap);
