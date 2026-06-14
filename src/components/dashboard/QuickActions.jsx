export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add New Lead
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          View All Leads
        </button>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
          Export Data
        </button>
      </div>
    </div>
  );
}