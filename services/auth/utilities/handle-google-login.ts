import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { AuthData, State, GoogleOauthResponse } from '../auth';
import { ls } from '@/lib/utilities/ls';

/**
 * Handles Google OAuth error cases and performs cleanup
 * 
 * @param e - The error object from Google OAuth or a custom error
 * @param onComplete - Optional callback function to execute after error handling, 
 *                     will be called with no arguments after error processing
 * @returns false to indicate the error state
 */

const googleOauthError = (
  e: Error, 
  onComplete?: (data?: AuthData) => void
): boolean => {
  const failureConditions: string[] = ['invalid_grant', 'State does not match', 'Something went wrong'];
  const loginFailed: boolean = failureConditions.some(substr => e.message && e.message.includes(substr));
  if (loginFailed) {
    toast.error('Login failed');
  }
  ls.removeItem('state');
  onComplete?.();
  return false;
};

/**
 * Processes a successful Google OAuth response, checks for valid state and
 * exchanges the code (temporary token) for authentication data
 * 
 * @param response - The Google OAuth response containing the authorization code
 *                 (temporary token) and state parameter for security validation
 * @param onComplete - Optional callback function to execute after successful processing,
 *                     will be called with the authentication data
 * @returns Promise resolving to the authentication data or undefined if state mismatch
 */

const googleOauthSuccess = async (
  response: GoogleOauthResponse, 
  onComplete?: (data?: AuthData) => void
): Promise<AuthData | undefined> => {
  const state: State = ls.getItem('state') || '';
  if (state !== response.state) {
    googleOauthError(new Error('State does not match'), onComplete);
    return;
  }
  try {
    const data = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strategy: 'google',
        tempToken: response.code
      })
    }).then(res => res.json()) as AuthData;
    console.log(data);
    toast.success('You are now logged in');
    onComplete?.(data);
    return data;
  } catch {
    googleOauthError(new Error('Something went wrong'), onComplete);
    return;
  }
};

/**
 * Initiates the Google OAuth login flow
 * 
 * @param onComplete - Optional callback function to execute after the OAuth flow completes,
 *                     will receive authentication data on success or undefined on failure
 * @returns Promise that resolves to undefined after initiating the OAuth flow
 * 
 * @remarks
 * This function:
 * 1. Generates a unique state value using UUID for CSRF protection
 * 2. Stores the state in localStorage for later validation
 * 3. Initializes the Google OAuth client with required parameters
 * 4. Configures success and error callbacks
 * 5. Triggers the Google OAuth popup flow
 * 
 * @example
 * ```typescript
 * handleGoogleLogin((authData) => {
 *   if (authData) {
 *     // Handle successful login
 *     console.log(authData.googleUserProfile.email);
 *   } else {
 *     // Handle login failure
 *   }
 * });
 * ```
 */

export const handleGoogleLogin = async (
  onComplete?: (data?: AuthData) => void
): Promise<undefined> => {
  const state: State = uuidv4();
  ls.setItem('state', state);
  window.google.accounts.oauth2.initCodeClient({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH__CLIENT_ID!,
    scope: 'email profile openid',
    ux_mode: 'popup',
    state,
    callback: (response) => googleOauthSuccess(response, onComplete),
    error_callback: (error) => googleOauthError(error, onComplete)
  }).requestCode();
}; 
