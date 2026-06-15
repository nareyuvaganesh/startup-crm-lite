import { useNavigate } from "react-router-dom";
import { useLeads } from "../../context/LeadContext";

export default function QuickActions() {
  const navigate = useNavigate();
  const { leads } = useLeads();

  const handleExportData = () => {
    const csvRows = [
      ["Name", "Company", "Email", "Phone", "Status", "Source"],
      ...leads.map((lead) => [
        lead.name,
        lead.company,
        lead.email,
        lead.phone,
        lead.status,
        lead.source || "",
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "startup-crm-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/leads")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Lead
        </button>

        <button
          onClick={() => navigate("/leads")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          View All Leads
        </button>

        <button
          onClick={handleExportData}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Export Data
        </button>
      </div>
    </div>
  );
}