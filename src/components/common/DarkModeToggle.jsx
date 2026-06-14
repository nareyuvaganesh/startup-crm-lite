import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
    >
      {isDarkMode ? (
        <>
          <Sun size={18} />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}