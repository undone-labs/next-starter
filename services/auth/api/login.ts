/**
 * Server-side authentication login handler that processes login requests
 * using different authentication strategies.
 */

'use server'

import InitializeGoogleStrategy from '@/services/auth/strategies/google'

import { Strategy, AuthData } from '@/services/auth/auth'

/**
 * Handles login requests using specified authentication strategies.
 * 
 * @param request - The incoming HTTP request containing login credentials
 * @returns A Response object containing the authentication data or error message
 * @throws When the authentication strategy is invalid or authentication fails
 * 
 * @example
 * Request body:
 * \{
 *   "strategy": "google",
 *   "tempToken": "google-temp-token"
 * \}
 * 
 * Response body:
 * \{
 *   "data": \{
 *     "strategy": "google",
 *     "googleUserProfile": \{
 *       "name": "Jane Doe",
 *       "email": "jane.doe\@example.com",
 *       "picture": "https://example.com/avatar.jpg"
 *     \}
 *   \}
 * \}
 */

export default async function Login(request: Request): Promise<Response> {
  const body: { strategy: Strategy, tempToken: string } = await request.json()
  const strategy: Strategy = body.strategy
  const tempToken: string = body.tempToken
  let data: AuthData

  try {
    switch (strategy) {
      case Strategy.GOOGLE:
        data = await InitializeGoogleStrategy(tempToken); break
      default:
        return new Response('Please provide a valid strategy', { status: 422 })
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'You are now logged in',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(message, {
      status: 422
    })
  }
}
