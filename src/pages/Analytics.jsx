// Import hooks from React.
import { useState } from "react";
// Import leads context hook to fetch lead records.
import { useLeads } from "../context/LeadContext";
// Import Lucide icons for UI layout elements and metric indicators.
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Clock,
  Activity,
  FileText,
  Download,
  Sparkles,
  AlertCircle,
  Calendar,
  Briefcase
} from "lucide-react";
// Import Recharts charting components to render the visualizations.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";
// Import helper calculation utilities.
import {
  getFilteredData,
  calculateKPIs,
  getLeadGrowthData,
  getStatusData,
  getSourceData,
  getConversionTrendData,
  getFunnelData,
  getDonutData,
  getStackedBarData,
  generateInsights
} from "../utils/analyticsHelpers";

/**
 * Analytics Page Component
 * Renders a data-dense, interactive analytics dashboard with KPI metrics, charts, and AI insights.
 */
export default function Analytics() {
  // Access leads from the application context.
  const { leads } = useLeads();
  // State hook managing current Date Filter selection (Today, Weekly, Monthly, Quarterly, Yearly).
  const [dateRange, setDateRange] = useState("Monthly");

  // Step 1: Filter lead data into Current and Previous subsets based on Date Filter
  const { currentLeads, previousLeads, days } = getFilteredData(leads, dateRange);

  // Step 2: Calculate high-level KPI cards metrics
  const kpis = calculateKPIs(currentLeads, previousLeads);

  // Step 3: Compute aggregated datasets for the 7 interactive charts
  const lineData = getLeadGrowthData(currentLeads, days);
  const statusData = getStatusData(currentLeads, previousLeads);
  const sourceData = getSourceData(currentLeads, previousLeads);
  const areaData = getConversionTrendData(currentLeads);
  const funnelData = getFunnelData(currentLeads);
  const donutData = getDonutData(currentLeads);
  const stackedBarData = getStackedBarData(currentLeads);

  // Step 4: Extract AI insights using KPIs and filtered records
  const insights = generateInsights(currentLeads, kpis);

  // Curated color palette for categorical charts (e.g. Pie chart)
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

  /**
   * handleExportCSV
   * Formats current filtered leads into CSV format and triggers a browser file download.
   */
  const handleExportCSV = () => {
    // CSV columns headers definition.
    const headers = ["ID", "Name", "Company", "Email", "Phone", "Status", "Source", "Value (USD)", "Response Time (Hrs)", "Created At"];
    
    // Map leads into escaped, comma-separated rows.
    const rows = currentLeads.map(l => [
      l.id,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      l.status,
      l.source || "Website",
      l.value || 0,
      l.responseTime || 0,
      l.createdAt
    ]);
    
    // Compile full CSV text body.
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    // Create download trigger link.
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `startup_crm_leads_${dateRange.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    // Click trigger.
    link.click();
    // Cleanup.
    document.body.removeChild(link);
  };

  /**
   * handleExportPDF
   * Triggers the system print dialog. Formatted print media CSS handles layout rendering.
   */
  const handleExportPDF = () => {
    window.print();
  };

  return (
    // Main container with transitions
    <div className="p-4 md:p-6 bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      
      {/* Dynamic CSS styles injected specifically to format PDF page margins and hides sidebars on Print */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          header, aside, nav, .no-print, button, .filter-tabs { display: none !important; }
          main, .p-4, .md\\:p-6 { padding: 0 !important; margin: 0 !important; }
          .chart-grid { grid-template-columns: 1fr !important; }
          .chart-card { page-break-inside: avoid !important; border: 1px solid #e2e8f0 !important; }
        }
      `}</style>

      {/* DASHBOARD HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 no-print">
        <div>
          {/* Main Title */}
          <h1 className="text-3xl font-black tracking-tight">Analytics Dashboard</h1>
          {/* Subtitle description */}
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time pipeline analytics, lead acquisition sources, and conversion insights.
          </p>
        </div>

        {/* Filters and Actions control bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Calendar Range Selection Panel */}
          <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-xs border border-gray-200 dark:border-gray-700 filter-tabs">
            {["Today", "Weekly", "Monthly", "Quarterly", "Yearly"].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  dateRange === range
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-gray-700 shadow-xs transition cursor-pointer"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xs hover:shadow-blue-500/20 transition cursor-pointer"
          >
            <FileText size={16} />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS GRID - Responsive 1 to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
        
        {/* KPI 1: Total Leads */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black">{kpis.totalLeads}</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.leadGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.leadGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(kpis.leadGrowth).toFixed(1)}% vs prev</span>
          </div>
        </div>

        {/* KPI 2: Active Leads */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Leads</span>
            <Activity size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black">{kpis.activeLeads}</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.activeGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.activeGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(kpis.activeGrowth).toFixed(1)}% vs prev</span>
          </div>
        </div>

        {/* KPI 3: Won Deals */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Won Deals</span>
            <Target size={18} className="text-green-500" />
          </div>
          <p className="text-2xl font-black">{kpis.wonDeals}</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.wonGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.wonGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(kpis.wonGrowth).toFixed(1)}% vs prev</span>
          </div>
        </div>

        {/* KPI 4: Lost Deals */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Lost Deals</span>
            <AlertCircle size={18} className="text-red-500" />
          </div>
          <p className="text-2xl font-black">{kpis.lostDeals}</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.lostGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.lostGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(kpis.lostGrowth).toFixed(1)}% vs prev</span>
          </div>
        </div>

        {/* KPI 5: Conversion Rate */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion %</span>
            <Activity size={18} className="text-violet-500" />
          </div>
          <p className="text-2xl font-black">{kpis.conversionRate.toFixed(1)}%</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.conversionGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.conversionGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{kpis.conversionGrowth >= 0 ? "+" : ""}{kpis.conversionGrowth.toFixed(1)}% points</span>
          </div>
        </div>

        {/* KPI 6: Revenue Generated */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Revenue Won</span>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black">${kpis.revenue.toLocaleString()}</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.revenueGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.revenueGrowth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(kpis.revenueGrowth).toFixed(1)}% vs prev</span>
          </div>
        </div>

        {/* KPI 7: Average Response Time */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-gray-250/30 dark:border-gray-700 transition">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Response</span>
            <Clock size={18} className="text-pink-500" />
          </div>
          <p className="text-2xl font-black">{kpis.avgResponse.toFixed(1)}h</p>
          <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${kpis.responseGrowth <= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
            {kpis.responseGrowth <= 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
            <span>{kpis.responseGrowth <= 0 ? "" : "+"}{kpis.responseGrowth.toFixed(1)}% response latency</span>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS PANEL */}
      <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 dark:from-blue-950/20 dark:to-violet-950/20 border border-blue-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-blue-600 dark:text-blue-400 animate-pulse" size={22} />
          <h2 className="text-lg font-extrabold tracking-tight">AI Sales Insights & Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Best lead source & status */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-xs border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">Performance Metrics</h4>
            <p className="text-sm font-semibold mb-1">
              ⭐ Best Lead Source: <span className="font-bold text-blue-600 dark:text-blue-400">{insights.bestSource}</span>
            </p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              📈 Growth Trends: <span className="font-semibold">{insights.growthSummary}</span>
            </p>
          </div>

          {/* Conversion bottlenecks */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-xs border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">Conversion Bottlenecks</h4>
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-500">{insights.bottleneck.split(" (")[0]}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insights.bottleneck.split(" (")[1]?.replace(")", "") || ""}</p>
              </div>
            </div>
          </div>

          {/* Strategic recommendations */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-xs border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">Recommended Actions</h4>
            <ul className="text-xs space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
              {insights.recommendations.map((rec, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: rec }} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* INTERACTIVE RECHARTS DIAGRAMS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 chart-grid">
        
        {/* CHART 1: Line Chart – Lead growth over time */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" />
              <span>Lead Growth Over Time</span>
            </h3>
            {lineData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={lineData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Line type="monotone" dataKey="New Leads" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Total Leads" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">📈 Total Period Leads: <span className="font-bold text-gray-900 dark:text-white">{lineData.total}</span></p>
              <p className="mb-2">🏆 Peak Performance: <span className="font-bold text-gray-900 dark:text-white">{lineData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Lowest Performance: <span className="font-bold text-gray-900 dark:text-white">{lineData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Lead velocity reached its highest in {lineData.highestCategory}, representing our best performing growth phase.</p>
            </div>
          </div>
        </div>

        {/* CHART 2: Bar Chart – Leads by status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              <span>Leads by Current Status</span>
            </h3>
            {statusData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={statusData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {statusData.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === "Won" ? "#10b981" : entry.name === "Lost" ? "#ef4444" : "#3b82f6"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">📋 Leads Accounted: <span className="font-bold text-gray-900 dark:text-white">{statusData.total}</span></p>
              <p className="mb-2">🏆 Highest Status: <span className="font-bold text-gray-900 dark:text-white">{statusData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Lowest Status: <span className="font-bold text-gray-900 dark:text-white">{statusData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Most deals reside in the **{statusData.highestCategory}** category. Transitioning these to proposals is a priority.</p>
            </div>
          </div>
        </div>

        {/* CHART 3: Pie Chart – Lead distribution by source */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              <span>Lead Distribution by Source</span>
            </h3>
            {sourceData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={sourceData.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sourceData.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">📥 Lead Inflow Count: <span className="font-bold text-gray-900 dark:text-white">{sourceData.total}</span></p>
              <p className="mb-2">🏆 Primary Source: <span className="font-bold text-gray-900 dark:text-white">{sourceData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Weakest Source: <span className="font-bold text-gray-900 dark:text-white">{sourceData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">**{sourceData.highestCategory}** provides the bulk of leads. Scale outreach on **{sourceData.lowestCategory}** to improve channels.</p>
            </div>
          </div>
        </div>

        {/* CHART 4: Area Chart – Monthly conversion trends */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Target size={18} className="text-blue-500" />
              <span>Monthly Conversion Rate Trends (%)</span>
            </h3>
            {areaData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={areaData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Area type="monotone" dataKey="rate" name="Conversion %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">🏆 Max Conversion: <span className="font-bold text-gray-900 dark:text-white">{areaData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Min Conversion: <span className="font-bold text-gray-900 dark:text-white">{areaData.lowestCategory}</span></p>
              <p className="mb-2">🤝 Total Closed Won: <span className="font-bold text-gray-900 dark:text-white">{areaData.total}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Conversions reached a peak in {areaData.highestCategory.split(" (")[0]}. Target standardizing these specific sales tactics.</p>
            </div>
          </div>
        </div>

        {/* CHART 5: Funnel Chart – Sales pipeline progression */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              <span>Sales Pipeline Funnel Progression</span>
            </h3>
            {funnelData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <FunnelChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Funnel dataKey="value" data={funnelData.chartData} isAnimationActive>
                    <LabelList position="right" fill="#94a3b8" stroke="none" dataKey="name" fontSize={10} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">🏁 Pipeline Entry: <span className="font-bold text-gray-900 dark:text-white">{funnelData.total} Leads</span></p>
              <p className="mb-2">🏆 Best Progress: <span className="font-bold text-gray-900 dark:text-white">{funnelData.highestCategory}</span></p>
              <p className="mb-2">🏁 Final Won Output: <span className="font-bold text-gray-900 dark:text-white">{funnelData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Progression rate displays standard pipeline dropoff. Target the meeting scheduling phase for scaling conversions.</p>
            </div>
          </div>
        </div>

        {/* CHART 6: Donut Chart – Conversion rate breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Briefcase size={18} className="text-blue-500" />
              <span>Conversion Rate Status Breakdown</span>
            </h3>
            {donutData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={donutData.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {donutData.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-48 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">🎯 Total Evaluated: <span className="font-bold text-gray-900 dark:text-white">{donutData.total}</span></p>
              <p className="mb-2">🏆 Largest Group: <span className="font-bold text-gray-900 dark:text-white">{donutData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Smallest Group: <span className="font-bold text-gray-900 dark:text-white">{donutData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Having a large **{donutData.highestCategory}** segment represents healthy business expansion and future revenue potential.</p>
            </div>
          </div>
        </div>

        {/* CHART 7: Stacked Bar Chart – Monthly leads by source */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xs border border-gray-200/60 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-4 chart-card lg:col-span-2">
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Calendar size={18} className="text-blue-500" />
              <span>Monthly Lead Inflow Stacked by Source</span>
            </h3>
            {stackedBarData.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stackedBarData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="Website" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Referral" stackId="a" fill="#10b981" />
                  <Bar dataKey="LinkedIn" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="Email Campaign" stackId="a" fill="#ec4899" />
                  <Bar dataKey="Cold Call" stackId="a" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-sm text-gray-400">No data available</div>
            )}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-56 bg-slate-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <div>
              <h4 className="font-extrabold text-gray-700 dark:text-white uppercase mb-2">Metrics Summary</h4>
              <p className="mb-2">📊 Overall Leads Sum: <span className="font-bold text-gray-900 dark:text-white">{stackedBarData.total}</span></p>
              <p className="mb-2">🏆 Top Channel: <span className="font-bold text-gray-900 dark:text-white">{stackedBarData.highestCategory}</span></p>
              <p className="mb-2">⚠️ Bottom Channel: <span className="font-bold text-gray-900 dark:text-white">{stackedBarData.lowestCategory}</span></p>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-750">
              <span className="font-bold text-gray-700 dark:text-white uppercase">Key Insight:</span>
              <p className="mt-1 leading-relaxed">Lead volume distribution month-over-month shows that **{stackedBarData.highestCategory}** continues to be our most consistent driver, while **{stackedBarData.lowestCategory}** remains an area for improvement.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}