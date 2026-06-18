import { memo } from "react";
import {
  CircleDollarSign,
  Clock3,
  DollarSign,
  Target,
  TrendingDown,
  Users,
} from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function StatsCards({ kpis }) {
  const cards = [
    { label: "Total Leads", value: kpis.totalLeads.toLocaleString(), icon: Users, tone: "blue" },
    { label: "Conversion Rate", value: `${kpis.conversionRate}%`, icon: Target, tone: "emerald" },
    { label: "Pipeline Value", value: currency.format(kpis.pipelineValue), icon: CircleDollarSign, tone: "violet" },
    { label: "Won Revenue", value: currency.format(kpis.wonRevenue), icon: DollarSign, tone: "cyan" },
    { label: "Average Sales Cycle", value: `${kpis.averageSalesCycle} days`, icon: Clock3, tone: "amber" },
    { label: "Lost Rate", value: `${kpis.lostRate}%`, icon: TrendingDown, tone: "rose" },
  ];
  const tones = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <article
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-5"
        >
          <div className={`mb-4 flex size-9 items-center justify-center rounded-xl ${tones[tone]}`}>
            <Icon className="size-4.5" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </article>
      ))}
    </div>
  );
}

export default memo(StatsCards);
