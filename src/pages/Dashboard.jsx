import { useLeads } from "../context/LeadContext";
import { getFilteredData, calculateKPIs } from "../utils/analyticsHelpers";
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";
import { Users, DollarSign, Award, TrendingUp } from "lucide-react";

/**
 * Dashboard page component
 * The control center of the Startup CRM Lite application.
 * Retrieves lead records from LeadContext, processes KPI statistics using
 * analytical helper functions, and renders a dashboard layout including:
 * - Metric Stats Cards (Total Leads, Revenue, Conversion, Active Leads)
 * - Sales Pipeline Segmented Progress Bar
 * - Recent Leads Table
 * - Administrative Quick Actions Panel
 * 
 * @component
 */
export default function Dashboard() {
  const { leads } = useLeads();

  // Compute current and previous monthly datasets using helper functions
  const { currentLeads, previousLeads } = getFilteredData(leads, "Monthly");
  const monthlyKpis = calculateKPIs(currentLeads, previousLeads);

  // Compute all-time database metrics
  const totalLeadsAllTime = leads.length;
  
  const wonLeadsAllTime = leads.filter((lead) => lead.status === "Won").length;
  
  const revenueAllTime = leads
    .filter((lead) => lead.status === "Won")
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);

  const conversionRateAllTime = totalLeadsAllTime > 0
    ? Math.round((wonLeadsAllTime / totalLeadsAllTime) * 100)
    : 0;

  const activeLeadsAllTime = leads.filter(
    (lead) => lead.status !== "Won" && lead.status !== "Lost"
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's a quick summary of your pipeline health.
          </p>
        </div>
      </div>

      {/* Stats Cards Row - 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Leads Card */}
        <StatsCard
          title="Total Leads"
          value={totalLeadsAllTime}
          icon={Users}
          change={monthlyKpis.leadGrowth}
          color="blue"
        />

        {/* Total Revenue Card */}
        <StatsCard
          title="Total Revenue"
          value={`$${revenueAllTime.toLocaleString()}`}
          icon={DollarSign}
          change={monthlyKpis.revenueGrowth}
          color="green"
        />

        {/* Conversion Rate Card */}
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRateAllTime}%`}
          icon={Award}
          change={monthlyKpis.conversionGrowth}
          color="yellow"
        />

        {/* Active Deals Card */}
        <StatsCard
          title="Active Leads"
          value={activeLeadsAllTime}
          icon={TrendingUp}
          change={monthlyKpis.activeGrowth}
          color="blue"
        />
      </div>

      {/* Pipeline Overview Row */}
      <div className="w-full">
        <PipelineOverview leads={leads} />
      </div>

      {/* Split Panel: Recent Leads and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads - Takes 2/3 of space on desktop */}
        <div className="lg:col-span-2">
          <RecentLeads leads={leads} />
        </div>

        {/* Quick Actions - Takes 1/3 of space on desktop */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}