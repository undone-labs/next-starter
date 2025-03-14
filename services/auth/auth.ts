export enum Strategy {
  GOOGLE = 'google',
}

export type State = string;

export type GoogleOauthResponse = {
  code: string;
  state: string;
};

export type GoogleUserProfile = {
  name: string,
  given_name: string,
  family_name: string,
  email: string,
  email_verified: boolean,
  picture: string,
}

export type AuthData = {
  strategy: Strategy,
  googleUserProfile: GoogleUserProfile
}

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: {
            client_id: string,
            scope: string,
            ux_mode: string,
            state: string,
            callback: (response: GoogleOauthResponse) => void,
            error_callback: (error: Error) => void
          }) => { requestCode: () => void }
        }
      }
    }
  }
}
