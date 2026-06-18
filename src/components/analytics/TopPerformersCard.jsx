import { memo } from "react";
import { Trophy } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function TopPerformersCard({ data }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Top Performers</h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">Highest won revenue contributors</p>
        </div>
        <Trophy className="size-5 text-amber-500" />
      </div>
      <div className="mt-5 space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-gray-700/40">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-500 shadow-sm dark:bg-gray-800 dark:text-gray-300">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800 dark:text-white">{item.name}</p>
              <p className="text-xs text-slate-400">{item.deals} won {item.deals === 1 ? "deal" : "deals"}</p>
            </div>
            <strong className="text-sm text-emerald-600 dark:text-emerald-400">{currency.format(item.revenue)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
export default memo(TopPerformersCard);
