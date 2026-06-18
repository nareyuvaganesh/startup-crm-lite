import { useMemo } from "react";
import {
  calculateAverageSalesCycle,
  calculateConversionByMonth,
  calculateForecastRevenue,
  calculateFunnelData,
  calculateHeatmapData,
  calculateLeadSources,
  calculateLostRate,
  calculateMonthlyLeads,
  calculatePipelineValue,
  calculateRevenueByMonth,
  calculateSalesVelocity,
  calculateStatusDistribution,
  calculateTopPerformers,
  calculateWonRevenue,
  filterLeadsByRange,
} from "../utils/analyticsHelpers";

export default function useAnalytics(leads, dateRange) {
  return useMemo(() => {
    const filteredLeads = filterLeadsByRange(leads, dateRange);
    const wonCount = filteredLeads.filter((lead) => lead?.status === "Won").length;
    const conversionRate = filteredLeads.length
      ? Number(((wonCount / filteredLeads.length) * 100).toFixed(1))
      : 0;

    return {
      filteredLeads,
      kpis: {
        totalLeads: filteredLeads.length,
        conversionRate,
        pipelineValue: calculatePipelineValue(filteredLeads),
        wonRevenue: calculateWonRevenue(filteredLeads),
        averageSalesCycle: calculateAverageSalesCycle(filteredLeads),
        lostRate: calculateLostRate(filteredLeads),
      },
      statusDistribution: calculateStatusDistribution(filteredLeads),
      funnelData: calculateFunnelData(filteredLeads),
      monthlyLeads: calculateMonthlyLeads(filteredLeads),
      conversionByMonth: calculateConversionByMonth(filteredLeads),
      revenueByMonth: calculateRevenueByMonth(filteredLeads),
      leadSources: calculateLeadSources(filteredLeads),
      salesVelocity: calculateSalesVelocity(filteredLeads),
      forecastRevenue: calculateForecastRevenue(filteredLeads),
      topPerformers: calculateTopPerformers(filteredLeads),
      heatmapData: calculateHeatmapData(filteredLeads),
    };
  }, [leads, dateRange]);
}
