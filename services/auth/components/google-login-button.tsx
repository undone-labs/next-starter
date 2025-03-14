/**
 * A button component that handles Google authentication.
 * 
 * @example
 * ```tsx
 * <GoogleLoginButton disabled={false} />
 * ```
 */

'use client';

import { useState } from 'react';
import { handleGoogleLogin } from '@/services/auth/utilities/handle-google-login';
import { useAuth } from '@/services/auth/context/auth-context';
import { MaterialCircle } from '@/lib/components/material-circle';

import styles from './google-login-button.module.scss';

type GoogleLoginButtonProps = {
  /** Whether the button should be disabled. Defaults to false. */
  disabled?: boolean
};

/**
 * A button component that initiates Google authentication.
 * Shows a loading state while authenticating and handles the authentication flow.
 * 
 * @param disabled - Whether the button should be disabled
 */

export default function GoogleLoginButton({ disabled = false }: GoogleLoginButtonProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setAuthData } = useAuth();

  const handleClick = async () => {
    if (disabled || isAuthenticating) return;
    setIsAuthenticating(true);
    await handleGoogleLogin(
      (data) => {
        setIsAuthenticating(false);
        if (data) {
          setAuthData(data);
        }
      }
    );
  };

  return (
    <button
      className={`${styles.button} ${isAuthenticating ? styles.authenticating : ''}`}
      onClick={handleClick}
      disabled={disabled || isAuthenticating}>

      {isAuthenticating && (
        <div className={styles['loader-container']}>
          <MaterialCircle className={styles.loader} />
          <span>authenticating...</span>
        </div>
      )}
      
      {!isAuthenticating && (
        <div className={styles.content}>
          <span>Continue with Google</span>
          <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </div>
      )}
      
    </button>
  );
} 
