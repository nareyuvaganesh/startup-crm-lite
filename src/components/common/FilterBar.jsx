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
      className="flex flex-nowrap gap-2 md:flex-wrap"
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
            className={`min-h-11 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${isActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]"
              : "bg-slate-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            {filter} ({count})
          </button>
        );
      })}
    </div>
  );
}
