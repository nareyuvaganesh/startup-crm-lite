import { memo, useCallback } from "react";

function SettingToggle({ description, label, name, onToggle, value }) {
  const handleToggle = useCallback(() => onToggle(name), [name, onToggle]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p id={`${name}-label`} className="text-sm font-bold text-gray-800 dark:text-gray-200">
          {label}
        </p>
        <p id={`${name}-description`} className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-labelledby={`${name}-label`}
        aria-describedby={`${name}-description`}
        onClick={handleToggle}
        className="inline-flex min-h-11 min-w-14 shrink-0 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span
          className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
            value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
              value ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

export default memo(SettingToggle);
