import { SearchX, Inbox, RotateCcw } from "lucide-react";

/**
 * EmptyState component
 * Shown when no leads match the current search/filter criteria.
 *
 * @param {object} props
 * @param {boolean} props.isFiltered - True when filters/search are active but no results
 * @param {function} [props.onClearFilters] - Resets search and filter state
 */
export default function EmptyState({ isFiltered = false, onClearFilters }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 py-16 px-6 text-center transition-all duration-300">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-gray-750 text-gray-400 dark:text-gray-500">
        {isFiltered ? <SearchX size={28} /> : <Inbox size={28} />}
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        No leads found
      </h2>

      {isFiltered ? (
        <>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            No leads match your current search or filter. Try adjusting your
            criteria or clear all filters to see every lead.
          </p>
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <RotateCcw size={16} />
              Clear filters
            </button>
          )}
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          You don&apos;t have any leads yet. Click &quot;Add New Lead&quot; to
          create your first prospect record.
        </p>
      )}
    </div>
  );
}
