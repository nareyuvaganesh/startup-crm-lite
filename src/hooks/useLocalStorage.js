import { useCallback, useState } from "react";

/**
 * Persists React state in the browser's localStorage.
 *
 * The returned tuple mirrors React's `useState` API. The setter accepts either
 * a new value or an updater function. If localStorage is unavailable, full, or
 * contains invalid JSON, the hook continues to work as regular in-memory state.
 *
 * @template T
 * @param {string} key - The localStorage key used to read and persist the value.
 * @param {T | (() => T)} initialValue - Value (or lazy initializer) used when
 *   the key does not exist, cannot be read, or contains invalid JSON.
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} The stored value and
 *   a setter with the same API as the setter returned by `useState`.
 *
 * @example
 * const [isDarkMode, setIsDarkMode] = useLocalStorage(
 *   "startup-crm-theme",
 *   false,
 * );
 *
 * @example
 * setIsDarkMode((currentMode) => !currentMode);
 */
export default function useLocalStorage(key, initialValue) {
  const resolveInitialValue = () =>
    initialValue instanceof Function ? initialValue() : initialValue;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // `window` may be unavailable during server-side rendering.
      if (typeof window === "undefined" || !window.localStorage) {
        return resolveInitialValue();
      }

      const savedValue = window.localStorage.getItem(key);

      // Checking against null preserves valid falsy values such as "", 0,
      // false, and null after JSON parsing.
      return savedValue !== null
        ? JSON.parse(savedValue)
        : resolveInitialValue();
    } catch (error) {
      console.warn(`Unable to read localStorage key "${key}".`, error);
      return resolveInitialValue();
    }
  });

  /**
   * Updates React state and attempts to persist the same value.
   * Storage failures do not prevent the in-memory state from updating.
   *
   * @param {React.SetStateAction<T>} value - A value or updater function.
   * @returns {void}
   */
  const setValue = useCallback((value) => {
    setStoredValue((currentValue) => {
      const valueToStore =
        value instanceof Function ? value(currentValue) : value;

      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Unable to write localStorage key "${key}".`, error);
      }

      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue];
}
