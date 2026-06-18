import { Toaster } from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

/**
 * Renders toast notifications using colors from the active application theme.
 *
 * @returns {React.JSX.Element} Theme-aware toast notification container.
 */
export default function ThemeAwareToaster() {
  const { isDarkMode } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: isDarkMode ? "#1f2937" : "#ffffff",
          color: isDarkMode ? "#f9fafb" : "#111827",
          border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.18)",
          fontSize: "14px",
          fontWeight: 600,
        },
        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: isDarkMode ? "#1f2937" : "#ffffff",
          },
        },
      }}
    />
  );
}
