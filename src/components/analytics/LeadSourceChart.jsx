import { memo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function LeadSourceChart({ data }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lead Sources</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400">Acquisition volume by channel</p>
      <div className="mt-5 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 18 }}>
            <XAxis type="number" allowDecimals={false} hide />
            <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <Tooltip formatter={(value) => [`${value} leads`, "Volume"]} cursor={{ fill: "var(--chart-cursor)" }} contentStyle={{ background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", borderRadius: 12 }} />
            <Bar dataKey="value" fill="#4f46e5" radius={[0, 8, 8, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
export default memo(LeadSourceChart);
