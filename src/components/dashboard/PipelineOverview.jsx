// Setup standard status meta-information with colors and descriptions
const STATUS_METADATA = {
  "New": {
    label: "New",
    colorClass: "bg-blue-600",
    bgClass: "bg-blue-600/10",
    textClass: "text-blue-600 dark:text-blue-400",
    dotClass: "bg-blue-600",
  },
  "Contacted": {
    label: "Contacted",
    colorClass: "bg-indigo-500",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-600 dark:text-indigo-400",
    dotClass: "bg-indigo-500",
  },
  "Meeting Scheduled": {
    label: "Meeting",
    colorClass: "bg-amber-500", // Warning Color F59E0B
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-600 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  "Proposal Sent": {
    label: "Proposal",
    colorClass: "bg-violet-500",
    bgClass: "bg-violet-500/10",
    textClass: "text-violet-600 dark:text-violet-400",
    dotClass: "bg-violet-500",
  },
  "Won": {
    label: "Won",
    colorClass: "bg-green-500", // Success Color 22C55E
    bgClass: "bg-green-500/10",
    textClass: "text-green-600 dark:text-green-400",
    dotClass: "bg-green-500",
  },
  "Lost": {
    label: "Lost",
    colorClass: "bg-red-500", // Danger Color EF4444
    bgClass: "bg-red-500/10",
    textClass: "text-red-600 dark:text-red-400",
    dotClass: "bg-red-500",
  },
};

/**
 * PipelineOverview component
 * Takes an array of leads, aggregates them by status, and renders
 * a visual segmented progress bar and an interactive legend showing counts and percentages.
 * 
 * @component
 * @param {object} props - Component props
 * @param {Array<object>} props.leads - Array of lead objects containing a 'status' field
 */
export default function PipelineOverview({ leads = [] }) {
  const totalLeads = leads.length;

  // Aggregate leads by status
  const aggregates = Object.keys(STATUS_METADATA).reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  leads.forEach((lead) => {
    const status = lead.status;
    if (status && Object.prototype.hasOwnProperty.call(aggregates, status)) {
      aggregates[status]++;
    }
  });

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            Sales Pipeline Overview
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Current stage distribution of {totalLeads} {totalLeads === 1 ? 'lead' : 'leads'}
          </p>
        </div>
      </div>

      {/* Segmented Horizontal Progress Bar */}
      <div className="w-full h-8 flex rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700/40 relative shadow-inner mb-6">
        {totalLeads === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-400 dark:text-gray-500">
            No active leads in pipeline
          </div>
        ) : (
          Object.entries(STATUS_METADATA).map(([status, meta]) => {
            const count = aggregates[status] || 0;
            if (count === 0) return null;
            const percentage = (count / totalLeads) * 100;

            return (
              <div
                key={status}
                style={{ width: `${percentage}%` }}
                className={`${meta.colorClass} h-full transition-all duration-500 ease-out relative group/segment hover:opacity-90 cursor-pointer`}
              >
                {/* Visual division line helper */}
                <div className="absolute top-0 right-0 w-[1px] h-full bg-white/20 last:hidden" />
                
                {/* Floating segment tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/segment:block z-20">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap shadow-xl font-semibold border border-gray-700">
                    {status}: {count} ({percentage.toFixed(1)}%)
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1 border-r border-b border-gray-700" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Legend & Details Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(STATUS_METADATA).map(([status, meta]) => {
          const count = aggregates[status] || 0;
          const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;

          return (
            <div 
              key={status} 
              className={`rounded-xl p-3 border border-transparent dark:border-transparent transition-all duration-200 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm ${meta.bgClass}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${meta.dotClass}`} />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 truncate">
                  {meta.label}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                  {count}
                </span>
                <span className={`text-xs font-semibold ${meta.textClass}`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
