/* eslint-disable react-refresh/only-export-components */
import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

/**
 * Theme React Context Object
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider component that manages active dark mode theme selection and updates HTML classes.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 * @returns {React.JSX.Element} The Provider component wrapping the children
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] =
    useLocalStorage("startup-crm-theme", false);

  /**
   * Toggles the theme between light and dark modes.
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((currentMode) => !currentMode);
  }, [setIsDarkMode]);

  // Keep the document theme synchronized with the persisted React state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const contextValue = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom React hook to consume the ThemeContext.
 * Throws an error if used outside a ThemeProvider wrapper.
 *
 * @returns {{
 *   isDarkMode: boolean,
 *   toggleTheme: () => void
 * }} The theme context state and toggle handler
 * @throws {Error} If context is consumed outside of the ThemeProvider component
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
