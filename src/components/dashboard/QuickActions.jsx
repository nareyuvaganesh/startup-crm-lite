import { useNavigate } from "react-router-dom";
import { useLeads } from "../../context/LeadContext";
import { PlusCircle, List, Download } from "lucide-react";
import toast from "react-hot-toast";

/**
 * QuickActions component
 * Provides administrative buttons for immediate workflow execution, including:
 * 1. Add New Lead (redirects to leads panel)
 * 2. View All Leads (redirects to leads table)
 * 3. Export Data (processes CRM state and triggers browser CSV download)
 * 
 * @component
 */
export default function QuickActions() {
  const navigate = useNavigate();
  const { leads } = useLeads();

  /**
   * Generates and triggers browser download of a sanitised CSV list of CRM leads.
   * Employs quote-escaping to ensure robust output format.
   */
  const handleExportData = () => {
    if (!leads || leads.length === 0) {
      toast.error("No lead data to export!");
      return;
    }

    try {
      const headers = ["Name", "Company", "Email", "Phone", "Status", "Source", "Value", "Date Added"];
      const csvRows = [
        headers,
        ...leads.map((lead) => [
          lead.name,
          lead.company,
          lead.email,
          lead.phone,
          lead.status,
          lead.source || "",
          lead.value || 0,
          lead.createdAt || "",
        ]),
      ];

      // Format row cells with quotation wraps and escape internal double quotes
      const csvContent = csvRows
        .map((row) =>
          row
            .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `startup-crm-leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup DOM node and reference
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("CRM Data exported successfully!");
    } catch (error) {
      console.error("Failed to export leads:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Frequently used management tasks
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {/* Add New Lead button - Primary blue theme */}
        <button
          onClick={() => navigate("/leads", { state: { focusForm: true } })}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>

        {/* View All Leads button - Secondary outline theme */}
        <button
          onClick={() => navigate("/leads")}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 transition-all duration-200 hover:border-blue-600 hover:bg-slate-50 hover:text-blue-600 active:scale-[0.99] focus:outline-none dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-gray-700/30 dark:hover:text-blue-400"
        >
          <List className="w-5 h-5 stroke-[2.5]" />
          <span>View All Leads</span>
        </button>

        {/* Export Data button - Tertiary soft theme */}
        <button
          onClick={handleExportData}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 active:scale-[0.99] focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>Export Data (CSV)</span>
        </button>
      </div>
    </div>
  );
}
