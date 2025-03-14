/**
 * This module provides functionality for authenticating users
 * through Google's OAuth2 service.
 * 
 * @remarks
 * The module uses the google-auth-library to interact with Google's OAuth2 API
 * and implements a secure authentication flow that includes:
 * - OAuth2 client configuration
 * - Temporary token verification
 * - User profile information retrieval
 */

import { OAuth2Client } from 'google-auth-library'

import { AuthData, Strategy, GoogleUserProfile } from "@/services/auth/auth";

/**
 * Generates a new Google OAuth2 client instance with configured credentials.
 * 
 * @returns A configured Google OAuth2 client
 */

const generateGoogleOAuth2Client = async (): Promise<OAuth2Client> => {
  return new Promise(resolve => {
    const client = new OAuth2Client({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH__CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH__CLIENT_SECRET,
      redirectUri: process.env.NEXT_PUBLIC_DOMAIN__CLIENT_URL,
    })
    resolve(client)
  })
}

/**
 * Verifies and sets up the OAuth2 client with the provided temporary token.
 * 
 * @param client - The OAuth2 client instance
 * @param tempToken - The temporary token to verify
 */

const verifyTempToken = async (client: OAuth2Client, tempToken: string): Promise<void> => {
  const { tokens } = await client.getToken(tempToken)
  client.setCredentials({ access_token: tokens.access_token })
}

/**
 * Retrieves the user profile information from Google's userinfo endpoint.
 * 
 * @param client - The authenticated OAuth2 client instance
 * @returns The user's Google profile information
 */

const getGoogleUserProfile = async (client: OAuth2Client): Promise<GoogleUserProfile> => {
  const userinfo = await client.request({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo'
  })
  return userinfo.data as GoogleUserProfile
}

/**
 * Main Google authentication strategy function that handles the OAuth flow.
 * 
 * @param tempToken - The temporary token received from Google OAuth
 * @returns Authentication data including user profile information
 * @throws If no temporary token is provided
 */

export default async function Google(tempToken: string): Promise<AuthData> {
  if (!tempToken) {
    throw new Error('Please provide a valid tempToken')
  }

  const client = await generateGoogleOAuth2Client()
  await verifyTempToken(client, tempToken)
  const googleUserProfile: GoogleUserProfile = await getGoogleUserProfile(client)

  return {
    strategy: Strategy.GOOGLE,
    googleUserProfile: {
      name: googleUserProfile.name,
      given_name: googleUserProfile.given_name,
      family_name: googleUserProfile.family_name,
      email: googleUserProfile.email,
      email_verified: googleUserProfile.email_verified,
      picture: googleUserProfile.picture,
    },
  }
}
