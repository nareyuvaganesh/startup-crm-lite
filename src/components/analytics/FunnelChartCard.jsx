import { memo } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "../../constants/analyticsColors";

function FunnelChartCard({ data }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Conversion Funnel</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400">Progress through each sales stage</p>
      <div className="mt-5 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={76} tickLine={false} axisLine={false} fontSize={12} stroke="var(--chart-axis)" />
            <Tooltip formatter={(value) => [`${value} leads`, "Volume"]} cursor={{ fill: "var(--chart-cursor)" }} contentStyle={{ background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", borderRadius: 12 }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
export default memo(FunnelChartCard);
