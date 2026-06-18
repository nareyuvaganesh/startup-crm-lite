import { useState } from "react";
import { useLeads } from "../context/LeadContext";
import useAnalytics from "../hooks/useAnalytics";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import StatsCards from "../components/analytics/StatsCards";
import PieChartCard from "../components/analytics/PieChartCard";
import FunnelChartCard from "../components/analytics/FunnelChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";
import RevenueChartCard from "../components/analytics/RevenueChartCard";
import LeadSourceChart from "../components/analytics/LeadSourceChart";
import SalesVelocityCard from "../components/analytics/SalesVelocityCard";
import ForecastCard from "../components/analytics/ForecastCard";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";
import TopPerformersCard from "../components/analytics/TopPerformersCard";
import EmptyAnalyticsState from "../components/analytics/EmptyAnalyticsState";

export default function Analytics() {
  const { leads } = useLeads();
  const [dateRange, setDateRange] = useState("30d");
  const analytics = useAnalytics(leads, dateRange);

  return (
    <div className="mx-auto max-w-7xl space-y-5 lg:space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            CRM Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
            Monitor pipeline health, conversion efficiency, revenue, and team performance.
          </p>
        </div>
        <AnalyticsFilters value={dateRange} onChange={setDateRange} />
      </header>

      {analytics.filteredLeads.length === 0 ? (
        <EmptyAnalyticsState />
      ) : (
        <>
          <StatsCards kpis={analytics.kpis} />

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            <PieChartCard data={analytics.statusDistribution} />
            <FunnelChartCard data={analytics.funnelData} />
            <BarChartCard data={analytics.monthlyLeads} />
            <LineChartCard data={analytics.conversionByMonth} />
            <RevenueChartCard data={analytics.revenueByMonth} />
            <LeadSourceChart data={analytics.leadSources} />
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            <SalesVelocityCard value={analytics.salesVelocity} />
            <ForecastCard
              forecast={analytics.forecastRevenue}
              wonRevenue={analytics.kpis.wonRevenue}
            />
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            <ActivityHeatmap data={analytics.heatmapData} />
            <TopPerformersCard data={analytics.topPerformers} />
          </section>
        </>
      )}
    </div>
  );
}
