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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col h-full transition-all duration-300">
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
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <PlusCircle className="w-5 h-5 stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>

        {/* View All Leads button - Secondary outline theme */}
        <button
          onClick={() => navigate("/leads")}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-gray-700/30 text-gray-750 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-xl font-bold border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 active:scale-[0.99] transition-all duration-200 cursor-pointer focus:outline-none"
        >
          <List className="w-5 h-5 stroke-[2.5]" />
          <span>View All Leads</span>
        </button>

        {/* Export Data button - Tertiary soft theme */}
        <button
          onClick={handleExportData}
          className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-gray-750 dark:hover:bg-gray-700/50 text-slate-700 dark:text-gray-200 py-3 px-4 rounded-xl font-bold border border-slate-200 dark:border-gray-650 hover:border-slate-350 dark:hover:border-gray-600 active:scale-[0.99] transition-all duration-200 cursor-pointer focus:outline-none"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>Export Data (CSV)</span>
        </button>
      </div>
    </div>
  );
}