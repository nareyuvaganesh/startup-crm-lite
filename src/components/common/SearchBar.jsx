import { useState, useEffect } from "react";
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
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange({ target: { value: localValue } });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, value, onChange]);

  const handleClear = () => {
    setLocalValue("");
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
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-750 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
