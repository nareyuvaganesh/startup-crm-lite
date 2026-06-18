import { memo } from "react";
import { Gauge } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function SalesVelocityCard({ value }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sales Velocity</h2>
          <p className="text-sm text-slate-500 dark:text-gray-400">Expected revenue generated per day</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Gauge className="size-5" />
        </div>
      </div>
      <p className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {currency.format(value)}
        <span className="ml-1 text-sm font-medium text-slate-400">/ day</span>
      </p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-gray-700">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
      </div>
    </article>
  );
}
export default memo(SalesVelocityCard);
