import { memo } from "react";
import StatusBadge from "./StatusBadge";
import { Pencil, Trash2 } from "lucide-react";

/**
 * LeadTable component
 * Renders a data-dense, tabular view listing all lead records.
 * Columns: Name, Company, Status, Email, Source, Date Added, and Actions.
 * Features:
 * - Responsive scroll container mapping to prevent layout breaks on small screen zones.
 * - Pill-shaped Status indicators.
 * - Date formatting for the 'Date Added' parameter.
 * - Interactive action buttons for Edit and Delete operations.
 * 
 * @component
 * @param {object} props - Component props
 * @param {Array<object>} props.leads - Array of lead data records
 * @param {function} props.onEdit - Callback invoked on Edit button click
 * @param {function} props.onDelete - Callback invoked on Delete button click
 */
function LeadTable({ leads = [], onEdit, onDelete }) {
  /**
   * Formats ISO timestamps into human-readable shorthand dates.
   * 
   * @param {string} dateString - The ISO date representation
   * @returns {string} Formatted date (e.g. "Jun 16, 2026")
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left lg:min-w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800/50 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <th className="py-4 px-4 pl-6">Name</th>
              <th className="py-4 px-4">Company</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4">Source</th>
              <th className="py-4 px-4">Date Added</th>
              <th className="py-4 px-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-gray-400 dark:text-gray-500 text-sm font-medium">
                  No leads matching the active search parameters.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id || lead.email}
                  className="hover:bg-slate-50/40 dark:hover:bg-gray-700/10 transition-colors duration-150 group"
                >
                  {/* Lead Name */}
                  <td className="py-3.5 px-4 pl-6 font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lead.name}
                  </td>
                  {/* Company */}
                  <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {lead.company}
                  </td>
                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  {/* Email */}
                  <td className="py-3.5 px-4 text-sm text-gray-600 dark:text-gray-300">
                    <a href={`mailto:${lead.email}`} className="hover:underline">
                      {lead.email}
                    </a>
                  </td>
                  {/* Source */}
                  <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {lead.source || "Website"}
                  </td>
                  {/* Date Added */}
                  <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(lead.createdAt)}
                  </td>
                  {/* Actions */}
                  <td className="py-3.5 px-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Edit Button */}
                      <button
                        onClick={() => onEdit(lead)}
                        aria-label={`Edit lead ${lead.name}`}
                        className="grid min-h-11 min-w-11 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                      >
                        <Pencil size={15} className="stroke-[2.2]" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(lead.id)}
                        aria-label={`Delete lead ${lead.name}`}
                        className="grid min-h-11 min-w-11 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none dark:hover:bg-red-950/20 dark:hover:text-red-400"
                      >
                        <Trash2 size={15} className="stroke-[2.2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(LeadTable);
