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
    <div className="max-w-full rounded-2xl border border-gray-100 bg-white px-4 py-12 text-center shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:px-6 sm:py-16">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
        {isFiltered ? <SearchX size={28} /> : <Inbox size={28} />}
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {isFiltered ? "No leads found" : "No leads yet"}
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
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
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
