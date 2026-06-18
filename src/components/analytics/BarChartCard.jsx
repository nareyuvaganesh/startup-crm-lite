import { memo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function BarChartCard({ data }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Leads</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400">Lead volume created by month</p>
      <div className="mt-5 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <Tooltip contentStyle={{ background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", borderRadius: 12 }} cursor={{ fill: "var(--chart-cursor)" }} />
            <Bar dataKey="leads" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={46} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
export default memo(BarChartCard);
