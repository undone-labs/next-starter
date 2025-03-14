import { useCallback } from 'react';

/** Default prefix used for localStorage keys */
const DEFAULT_PREFIX: string = process.env.NEXT_PUBLIC_LS_PREFIX || '';

/** Options for configuring the localStorage hook */
interface UseLsOptions {
  /** Custom prefix to use for localStorage keys */
  prefix?: string;
}

/** Return type for the useLs hook */
interface UseLsReturn {
  /** Sets a value in localStorage */
  setItem: (key: string, value: string) => void;
  /** Retrieves a value from localStorage */
  getItem: (key: string) => string | null;
  /** Removes a value from localStorage */
  removeItem: (key: string) => void;
  /** Clears all localStorage items */
  clear: () => void;
}

/**
 * Non-hook version of localStorage utilities for use outside of React components.
 * Provides methods to interact with localStorage with a configurable prefix.
 */

export const ls = {
  /**
   * Sets a value in localStorage with the specified prefix
   * @param key - The key to store the value under
   * @param value - The value to store
   * @param prefix - Optional prefix to use for the key
   */
  setItem: (key: string, value: string, prefix: string = DEFAULT_PREFIX): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${prefix}${key}`, value);
    }
  },

  /**
   * Retrieves a value from localStorage with the specified prefix
   * @param key - The key to retrieve
   * @param prefix - Optional prefix to use for the key
   * @returns The stored value or null if not found
   */
  getItem: (key: string, prefix: string = DEFAULT_PREFIX): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`${prefix}${key}`);
    }
    return null;
  },

  /**
   * Removes a value from localStorage with the specified prefix
   * @param key - The key to remove
   * @param prefix - Optional prefix to use for the key
   */
  removeItem: (key: string, prefix: string = DEFAULT_PREFIX): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${prefix}${key}`);
    }
  },

  /**
   * Clears all localStorage items with the specified prefix
   * @param prefix - Optional prefix to use for filtering items to clear
   */
  clear: (prefix: string = DEFAULT_PREFIX): void => {
    if (typeof window !== 'undefined') {
      const keysToRemove = Object.keys(localStorage)
        .filter(key => key.startsWith(prefix));
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  },
};

/**
 * Custom hook for managing localStorage operations with a configurable prefix.
 * Provides memoized methods to interact with localStorage safely within React components.
 * 
 * @param options - Configuration options including prefix for localStorage keys
 * @returns Object containing memoized localStorage operation methods
 * @example
 * ```tsx
 * const { setItem, getItem } = useLs({ prefix: 'myApp_' });
 * setItem('user', 'john');
 * const user = getItem('user');
 * ```
 */

export const useLs = (options: UseLsOptions = {}): UseLsReturn => { 
  const { prefix = DEFAULT_PREFIX } = options;

  /**
   * Creates a prefixed key for localStorage operations
   * @param key - The base key to prefix
   * @returns The prefixed key
   */
  const getPrefixedKey = useCallback((key: string): string => {
    return `${prefix}${key}`;
  }, [prefix]);

  /**
   * Sets a value in localStorage
   * @param key - The key to store the value under
   * @param value - The value to store
   */
  const setItem = useCallback((key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(getPrefixedKey(key), value);
    }
  }, [getPrefixedKey]);

  /**
   * Retrieves a value from localStorage
   * @param key - The key to retrieve
   * @returns The stored value or null if not found
   */
  const getItem = useCallback((key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(getPrefixedKey(key));
    }
    return null;
  }, [getPrefixedKey]);

  /**
   * Removes a value from localStorage
   * @param key - The key to remove
   */
  const removeItem = useCallback((key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(getPrefixedKey(key));
    }
  }, [getPrefixedKey]);

  /**
   * Clears all localStorage items
   */
  const clear = useCallback((): void => {
    if (typeof window !== 'undefined') {
      const keysToRemove = Object.keys(localStorage)
        .filter(key => key.startsWith(prefix));
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }, [prefix]);

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
}; 
