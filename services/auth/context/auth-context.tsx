/**
 * Authentication context provider for managing user authentication state
 * throughout the application. Handles persistence of authentication data using localStorage.
 */

'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthData } from '../auth';
import { ls } from '@/lib/utilities/ls';

type AuthContextType = {
  /** The current authentication data or null if not authenticated */
  authData: AuthData | null;
  /** Function to update the authentication data */
  setAuthData: (data: AuthData | null) => void;
  /** Flag indicating whether the authentication data is being loaded */
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component that manages authentication state and persistence
 * 
 * @param children - Child components that will have access to the auth context
 * @returns AuthContext Provider component
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load authentication data from local storage on initial render
  useEffect(() => {
    try {
      const savedAuthData = ls.getItem('authData');
      if (savedAuthData) {
        setAuthData(JSON.parse(savedAuthData));
      }
    } catch (error) {
      console.error('Failed to load auth data from localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist authentication data to local storage whenever it changes
  useEffect(() => {
    if (authData) {
      ls.setItem('authData', JSON.stringify(authData));
    } else {
      ls.removeItem('authData');
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access the authentication context
 * 
 * @returns The authentication context value
 * @throws Error if used outside of an AuthProvider
 */

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
