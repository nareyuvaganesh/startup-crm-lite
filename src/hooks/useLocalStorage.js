 import { useState } from "react";

/**
 * Custom Hook: useLocalStorage
 * Works like useState but saves data to localStorage
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
