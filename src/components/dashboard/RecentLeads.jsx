// Dynamic status badge styling helper
const getStatusBadgeStyle = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("new")) {
    return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900/30";
  }
  if (s.includes("contacted")) {
    return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30";
  }
  if (s.includes("meeting")) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-100 dark:border-amber-900/30";
  }
  if (s.includes("proposal")) {
    return "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-100 dark:border-violet-900/30";
  }
  if (s.includes("won")) {
    return "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-100 dark:border-green-900/30";
  }
  if (s.includes("lost")) {
    return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900/30";
  }
  return "bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-150 dark:border-gray-650";
};

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
export default function RecentLeads({ leads = [] }) {
  // Sort leads by creation date descending, fallback to empty array
  const recent = [...(leads || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 flex flex-col h-full transition-all duration-300">
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

      <div className="flex-1 overflow-x-auto">
        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No recent leads available.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                <th className="pb-3 pl-2">Lead / Company</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-750">
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}