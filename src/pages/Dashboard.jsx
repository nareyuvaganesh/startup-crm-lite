 
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="p-6 bg-slate-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-2">
        Welcome Back!
      </h1>

      <p className="text-gray-500 mb-6">
        Here's your pipeline overview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Leads"
          value="42"
          change="12"
          color="bg-blue-600"
        />

        <StatsCard
          title="Won"
          value="18"
          change="8"
          color="bg-green-600"
        />

        <StatsCard
          title="Lost"
          value="6"
          change="2"
          color="bg-red-500"
        />

        <StatsCard
          title="Conversion Rate"
          value="43%"
          change="5"
          color="bg-yellow-500"
        />
      </div>

      <div className="mb-6">
        <PipelineOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads />
        <QuickActions />
      </div>
    </div>
  );
}