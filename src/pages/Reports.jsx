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

// Colors for status breakdown bars
const STATUS_COLORS = {
  "New": "#3b82f6",
  "Contacted": "#6366f1",
  "Meeting Scheduled": "#f59e0b",
  "Proposal Sent": "#8b5cf6",
  "Won": "#10b981",
  "Lost": "#ef4444",
};

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
  const totalLeads = leads.length;

  // Compute dynamic KPIs
  const wonLeads = leads.filter((l) => l.status === "Won");
  
  const totalRevenue = wonLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
  
  const averageValue = totalLeads > 0 
    ? Math.round(leads.reduce((sum, l) => sum + (Number(l.value) || 0), 0) / totalLeads)
    : 0;

  const conversionRate = totalLeads > 0 
    ? ((wonLeads.length / totalLeads) * 100).toFixed(1)
    : "0.0";

  // Aggregate status totals
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {
    "New": 0,
    "Contacted": 0,
    "Meeting Scheduled": 0,
    "Proposal Sent": 0,
    "Won": 0,
    "Lost": 0,
  });

  // Calculate charts data using analyticsHelpers
  const { currentLeads, days } = getFilteredData(leads, "Monthly");
  const statusChartResult = getStatusData(currentLeads, []);
  const growthChartResult = getLeadGrowthData(currentLeads, days);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Lead Reports
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Detailed metrics, status breakdowns, and pipeline chart analytics.
        </p>
      </div>

      {/* KPI Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Leads Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Leads
            </span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {totalLeads}
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Active in database
          </span>
        </div>

        {/* Total Won Revenue Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Won Revenue
            </span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Total closed won deals
          </span>
        </div>

        {/* Average Deal Value Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Avg Deal Value
            </span>
            <TrendingUp className="w-5 h-5 text-violet-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            ${averageValue.toLocaleString()}
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Mean of all lead values
          </span>
        </div>

        {/* Win / Conversion Rate Card */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Conversion %
            </span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {conversionRate}%
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Won Leads / Total Leads
          </span>
        </div>
      </div>

      {/* Lead Status Breakdown Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          <FileText size={18} className="text-blue-500" />
          <span>Stage-by-Stage Lead Counts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(statusCounts).map(([status, count]) => {
            const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
            const barColor = STATUS_COLORS[status] || "#6b7280";

            return (
              <div 
                key={status} 
                className="bg-slate-50/50 dark:bg-gray-750/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 transition-transform duration-200 hover:scale-[1.01]"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-gray-755 dark:text-gray-300">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-5 flex flex-col min-h-[360px]">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            Lead Distribution by Stage (Current Period)
          </h3>
          <div className="flex-1">
            {statusChartResult.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={statusChartResult.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-5 flex flex-col min-h-[360px]">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
            Lead Growth Trend
          </h3>
          <div className="flex-1">
            {growthChartResult.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={growthChartResult.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
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
