const FILTERS = [
  "All",
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
];

/**
 * FilterBar component
 * Row of clickable status filter buttons with lead counts per filter.
 *
 * @param {object} props
 * @param {string} props.activeFilter - Currently selected filter
 * @param {function} props.onFilterChange - Callback when a filter is selected
 * @param {Array<object>} props.leads - Full leads array used to calculate counts
 */
export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  const getCount = (filter) => {
    if (filter === "All") return leads.length;
    return leads.filter((lead) => lead.status === filter).length;
  };

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter leads by status"
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        const count = getCount(filter);

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            aria-pressed={isActive}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]"
                : "bg-slate-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {filter} ({count})
          </button>
        );
      })}
    </div>
  );
}
