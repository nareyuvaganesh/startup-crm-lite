 import { useLeads } from "../context/LeadContext";

import PieChartCard from "../components/analytics/PieChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";

import {
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
} from "../utils/analyticsHelpers";

export default function Analytics() {
  const { leads } = useLeads();

  const statusData = getStatusDistribution(leads);
  const monthlyData = getMonthlyLeads(leads);
  const conversionData = getConversionByMonth(leads);

  const totalLeads = leads.length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const wonRate =
    totalLeads > 0
      ? ((wonLeads / totalLeads) * 100).toFixed(1)
      : 0;

  return (
    <div className="p-6 bg-slate-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Leads
          </h3>
          <p className="text-3xl font-bold">
            {totalLeads}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Won Rate
          </h3>
          <p className="text-3xl font-bold">
            {wonRate}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Avg Time To Close
          </h3>
          <p className="text-3xl font-bold">
            N/A
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <PieChartCard data={statusData} />
        <BarChartCard data={monthlyData} />
        <LineChartCard data={conversionData} />
      </div>
    </div>
  );
}