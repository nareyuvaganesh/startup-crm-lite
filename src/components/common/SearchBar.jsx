import { Search, X } from "lucide-react";

/**
 * SearchBar component
 * Controlled search input with debounced onChange (300ms), search icon, and clear button.
 *
 * @param {object} props
 * @param {string} props.value - Current search query from parent
 * @param {function} props.onChange - Called with a synthetic event after debounce
 */
export default function SearchBar({ value, onChange }) {
  const handleClear = () => {
    onChange({ target: { value: "" } });
  };

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="text"
        aria-label="Search leads by name, company, or email"
        placeholder="Search by name, company, or email..."
        value={value}
        onChange={onChange}
        className="min-h-11 w-full rounded-xl border border-gray-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-0 top-1/2 grid min-h-11 min-w-11 -translate-y-1/2 place-items-center rounded-lg text-gray-400 transition-colors duration-200 hover:bg-gray-200/60 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:hover:bg-gray-700/60 dark:hover:text-gray-300"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
