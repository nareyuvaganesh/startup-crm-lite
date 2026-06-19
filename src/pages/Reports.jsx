import { useMemo } from "react";
import { useLeads } from "../context/LeadContext";
import {
  getFilteredData,
  getStatusData,
  getLeadGrowthData,
} from "../utils/analyticsHelpers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, FileText, DollarSign, Award, Activity } from "lucide-react";
import { STATUS_OPTIONS } from "../constants";
import { STATUS_COLORS } from "../constants/analyticsColors";
import ReportMetricCard from "../components/reports/ReportMetricCard";

/**
 * Reports Page Component
 * Summarizes performance records across leads:
 * - Computes dynamic KPIs (Conversion, Revenue, Total Volume, Average values).
 * - Visualizes lead progress stages with customized progress bars.
 * - Renders analytical charts (Lead Stage distribution, Lead Growth timeline) using Recharts.
 * 
 * @component
 */
export default function Reports() {
  const { leads } = useLeads();
  const reportData = useMemo(() => {
    const summary = leads.reduce(
      (result, lead) => {
        const value = Number(lead.amount ?? lead.value) || 0;
        result.totalValue += value;
        if (lead.status === "Won") {
          result.wonCount += 1;
          result.totalRevenue += value;
        }
        if (Object.hasOwn(result.statusCounts, lead.status)) {
          result.statusCounts[lead.status] += 1;
        }
        return result;
      },
      {
        wonCount: 0,
        totalRevenue: 0,
        totalValue: 0,
        statusCounts: Object.fromEntries(
          STATUS_OPTIONS.map((status) => [status, 0]),
        ),
      },
    );
    const { currentLeads, days } = getFilteredData(leads, "Monthly");

    return {
      ...summary,
      totalLeads: leads.length,
      averageValue: leads.length
        ? Math.round(summary.totalValue / leads.length)
        : 0,
      conversionRate: leads.length
        ? ((summary.wonCount / leads.length) * 100).toFixed(1)
        : "0.0",
      statusChartResult: getStatusData(currentLeads, []),
      growthChartResult: getLeadGrowthData(currentLeads, days),
    };
  }, [leads]);

  const {
    averageValue,
    conversionRate,
    growthChartResult,
    statusChartResult,
    statusCounts,
    totalLeads,
    totalRevenue,
  } = reportData;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 lg:space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Lead Reports
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Detailed metrics, status breakdowns, and pipeline chart analytics.
        </p>
      </div>

      {/* KPI Cards section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <ReportMetricCard icon={Activity} label="Total Leads" value={totalLeads} description="Active in database" iconClassName="text-blue-500" />
        <ReportMetricCard icon={DollarSign} label="Won Revenue" value={`$${totalRevenue.toLocaleString()}`} description="Total closed won deals" iconClassName="text-green-600" />
        <ReportMetricCard icon={TrendingUp} label="Avg Deal Value" value={`$${averageValue.toLocaleString()}`} description="Mean of all lead values" iconClassName="text-violet-600" />
        <ReportMetricCard icon={Award} label="Conversion %" value={`${conversionRate}%`} description="Won Leads / Total Leads" iconClassName="text-amber-600" />
      </div>

      {/* Lead Status Breakdown Section */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          <FileText size={18} className="text-blue-500" />
          <span>Stage-by-Stage Lead Counts</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Object.entries(statusCounts).map(([status, count]) => {
            const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
            const barColor = STATUS_COLORS[status] || "#6b7280";

            return (
              <div 
                key={status} 
                className="bg-slate-50/50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 transition-transform duration-200 hover:scale-[1.01]"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {status}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-gray-900 dark:text-white">
                      {count}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar fill */}
                <div className="w-full h-2 rounded-full bg-gray-200/60 dark:bg-gray-700/60 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytical Visualizations section */}
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Status Distribution Bar Chart */}
        <div className="flex min-h-[320px] min-w-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-md dark:border-gray-700/50 dark:bg-gray-800 sm:min-h-[360px] sm:p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            Lead Distribution by Stage (Current Period)
          </h3>
          <div className="flex-1">
            {statusChartResult.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={statusChartResult.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="name" stroke="var(--chart-axis)" fontSize={10} tickLine={false} />
                  <YAxis stroke="var(--chart-axis)" fontSize={10} tickLine={false} />
                  <Tooltip cursor={{ fill: "var(--chart-cursor)" }} contentStyle={{ borderRadius: "12px", background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {statusChartResult.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">
                No active metrics.
              </div>
            )}
          </div>
        </div>

        {/* Lead growth over time Line Chart */}
        <div className="flex min-h-[320px] min-w-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-md dark:border-gray-700/50 dark:bg-gray-800 sm:min-h-[360px] sm:p-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            Lead Growth Trend
          </h3>
          <div className="flex-1">
            {growthChartResult.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={growthChartResult.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="name" stroke="var(--chart-axis)" fontSize={10} tickLine={false} />
                  <YAxis stroke="var(--chart-axis)" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", background: "var(--chart-tooltip-bg)", borderColor: "var(--chart-tooltip-border)", color: "var(--chart-tooltip-text)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Line type="monotone" dataKey="New Leads" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Total Leads" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">
                No active growth trends.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
