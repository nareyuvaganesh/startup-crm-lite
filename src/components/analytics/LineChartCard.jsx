import { memo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function LineChartCard({ data }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Conversion Trend</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400">Monthly won-deal conversion rate</p>
      <div className="mt-5 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <YAxis unit="%" tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <Tooltip formatter={(value) => [`${value}%`, "Conversion"]} contentStyle={{ background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", borderRadius: 12 }} />
            <Line type="monotone" dataKey="conversionRate" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4, fill: "#7c3aed" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
export default memo(LineChartCard);
