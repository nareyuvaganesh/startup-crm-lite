import { memo } from "react";
import { Sparkles } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ForecastCard({ forecast, wonRevenue }) {
  const uplift = Math.max(0, forecast - wonRevenue);
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Forecast</h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">Probability-weighted pipeline outlook</p>
        </div>
        <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <Sparkles className="size-5" />
        </div>
      </div>
      <p className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {currency.format(forecast)}
      </p>
      <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        {currency.format(uplift)} weighted pipeline beyond won revenue
      </p>
    </article>
  );
}
export default memo(ForecastCard);
