import { useLeads } from "../context/LeadContext";
import { getFilteredData, calculateKPIs } from "../utils/analyticsHelpers";
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";
import DateWidget from "../components/dashboard/DateWidget";
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
  const dashboardMetrics = useMemo(() => {
    const { currentLeads, previousLeads } = getFilteredData(leads, "Monthly");
    const monthlyKpis = calculateKPIs(currentLeads, previousLeads);
    const totals = leads.reduce(
      (result, lead) => {
        if (lead.status === "Won") {
          result.won += 1;
          result.revenue += Number(lead.amount ?? lead.value) || 0;
        } else if (lead.status !== "Lost") {
          result.active += 1;
        }
        return result;
      },
      { won: 0, revenue: 0, active: 0 },
    );

    return {
      monthlyKpis,
      total: leads.length,
      revenue: totals.revenue,
      active: totals.active,
      conversionRate: leads.length
        ? Math.round((totals.won / leads.length) * 100)
        : 0,
    };
  }, [leads]);

  return (
    <div className="mx-auto max-w-7xl space-y-5 lg:space-y-6">
      {/* Header welcome banner */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's a quick summary of your pipeline health.
          </p>
        </div>
        <DateWidget />
      </div>

      {/* Stats Cards Row - 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {/* Total Leads Card */}
        <StatsCard
          title="Total Leads"
          value={dashboardMetrics.total}
          icon={Users}
          change={dashboardMetrics.monthlyKpis.leadGrowth}
          trendLabel="vs last month"
          color="blue"
        />

        {/* Total Revenue Card */}
        <StatsCard
          title="Total Revenue"
          value={`$${dashboardMetrics.revenue.toLocaleString()}`}
          icon={DollarSign}
          change={dashboardMetrics.monthlyKpis.revenueGrowth}
          trendLabel="revenue growth"
          color="green"
        />

        {/* Conversion Rate Card */}
        <StatsCard
          title="Conversion Rate"
          value={`${dashboardMetrics.conversionRate}%`}
          icon={Award}
          change={dashboardMetrics.monthlyKpis.conversionGrowth}
          trendLabel="conversion"
          color="yellow"
        />

        {/* Active Deals Card */}
        <StatsCard
          title="Active Leads"
          value={dashboardMetrics.active}
          icon={TrendingUp}
          change={dashboardMetrics.monthlyKpis.activeGrowth}
          trendLabel="active leads"
          color="blue"
        />
      </div>

      {/* Pipeline Overview Row */}
      <div className="w-full">
        <PipelineOverview leads={leads} />
      </div>

      {/* Split Panel: Recent Leads and Quick Actions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Recent Leads - Takes 2/3 of space on desktop */}
        <div>
          <RecentLeads leads={leads} />
        </div>

        {/* Quick Actions - Takes 1/3 of space on desktop */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
import { useMemo } from "react";
