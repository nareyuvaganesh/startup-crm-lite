import { memo, useMemo } from "react";
import StatusBadge from "../leads/StatusBadge";

/**
 * RecentLeads component
 * Filters, sorts, and renders the 5 most recently created leads in a clean,
 * modern tabular structure. Each lead features user identification, company affiliation,
 * styled status badges, and formatted date indicators.
 * 
 * @component
 * @param {object} props - Component props
 * @param {Array<object>} props.leads - Array of lead data records
 */
function RecentLeads({ leads = [] }) {
  // Sort leads by creation date descending, fallback to empty array
  const recent = useMemo(
    () =>
      [...leads]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
    [leads],
  );

  /**
   * Helper to safely format ISO strings into human readable local dates.
   * 
   * @param {string} dateString - ISO date string
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
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Leads
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Latest 5 prospects added to your system
          </p>
        </div>
      </div>

      <div className="flex-1">
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No recent leads available.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 sm:hidden">
              {recent.map((lead) => (
                <div
                  key={lead.id || lead.email}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-700"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {lead.name}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {lead.company}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={lead.status} />
                    <p className="mt-1 text-[10px] text-gray-400">
                      {formatDate(lead.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden overflow-x-auto sm:block">
          <table className="min-w-[520px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="pb-3 pl-2">Lead / Company</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Date Added</th>
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recent.map((lead) => (
                <tr 
                  key={lead.id || lead.email}
                  className="hover:bg-slate-50/50 dark:hover:bg-gray-700/20 transition-colors duration-150 group"
                >
                  <td className="py-3.5 pl-2">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                      {lead.name}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {lead.company}
                    </div>
                  </td>
                  <td className="py-3.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="py-3.5 pr-2 text-right text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(RecentLeads);
