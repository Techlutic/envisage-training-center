/* ============================================
   useLocalStorage Hook
   Persist state to localStorage
   ============================================ */

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with state sync
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial/default value
 * @returns {Array} - [value, setValue, removeValue]
 */
const useLocalStorage = (key, initialValue) => {
  // Get initial value from storage or use default
  const readValue = useCallback(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Save to localStorage
  const setValue = useCallback(
    (value) => {
      // SSR safety check
      if (typeof window === 'undefined') {
        console.warn('localStorage is not available');
        return;
      }

      try {
        // Allow value to be a function (like setState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new CustomEvent('local-storage', {
            detail: { key, value: valueToStore },
          })
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      window.dispatchEvent(
        new CustomEvent('local-storage', {
          detail: { key, value: null },
        })
      );
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.warn('Error parsing storage event:', error);
        }
      }
    };

    // Native storage event (cross-tab)
    window.addEventListener('storage', handleStorageChange);

    // Custom event (same-tab)
    const handleLocalEvent = (event) => {
      if (event.detail.key === key) {
        setStoredValue(event.detail.value);
      }
    };
    window.addEventListener('local-storage', handleLocalEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleLocalEvent);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for session storage
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value
 * @returns {Array} - [value, setValue, removeValue]
 */
export const useSessionStorage = (key, initialValue) => {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') return;

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing multiple storage keys
 * @param {Object} schema - { key: defaultValue } mapping
 * @returns {Object} - { values, setValues, clearAll }
 */
export const useStorageObject = (schema) => {
  const [values, setValues] = useState(() => {
    if (typeof window === 'undefined') return schema;

    const stored = {};
    Object.keys(schema).forEach((key) => {
      try {
        const item = window.localStorage.getItem(key);
        stored[key] = item ? JSON.parse(item) : schema[key];
      } catch {
        stored[key] = schema[key];
      }
    });
    return stored;
  });

  const updateValue = useCallback((key, value) => {
    if (typeof window === 'undefined') return;

    try {
      const valueToStore = value instanceof Function ? value(values[key]) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setValues((prev) => ({ ...prev, [key]: valueToStore }));
    } catch (error) {
      console.warn(`Error updating storage key "${key}":`, error);
    }
  }, [values]);

  const clearAll = useCallback(() => {
    if (typeof window === 'undefined') return;

    Object.keys(schema).forEach((key) => {
      window.localStorage.removeItem(key);
    });
    setValues(schema);
  }, [schema]);

  return { values, updateValue, clearAll };
};

export default useLocalStorage;