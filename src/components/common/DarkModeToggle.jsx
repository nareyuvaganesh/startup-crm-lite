import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Accessible animated switch for changing the application color theme.
 *
 * @returns {React.JSX.Element} Theme switch showing the currently active mode.
 */
export default function DarkModeToggle({ compact = false }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const modeLabel = isDarkMode ? "Dark mode" : "Light mode";

  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "justify-between"}`}>
      {!compact && <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors duration-200 dark:text-gray-200">
        {isDarkMode ? (
          <Moon className="size-4 text-indigo-400" aria-hidden="true" />
        ) : (
          <Sun className="size-4 text-amber-500" aria-hidden="true" />
        )}
        {modeLabel}
      </span>}

      <button
        type="button"
        role="switch"
        aria-checked={isDarkMode}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        onClick={toggleTheme}
        className="relative inline-flex h-11 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
      >
        <span
          className={`relative inline-flex h-6 w-11 items-center rounded-full border shadow-inner transition-colors duration-200 ${
            isDarkMode
              ? "border-indigo-500 bg-indigo-600"
              : "border-gray-300 bg-gray-200"
          }`}
        >
          <span
            className={`flex size-4 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition-transform duration-200 ${
              isDarkMode ? "translate-x-6" : "translate-x-1"
            }`}
          >
            {isDarkMode ? (
              <Moon className="size-2.5 text-indigo-600" aria-hidden="true" />
            ) : (
              <Sun className="size-2.5 text-amber-500" aria-hidden="true" />
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
