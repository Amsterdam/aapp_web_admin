import {Configuration, SilentRequest} from '@azure/msal-browser'

import {currentClientId, currentRedirectUri} from 'utils/environment'

export const msalConfig: Configuration = {
  auth: {
    clientId: currentClientId,
    authority:
      'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804',
    redirectUri: currentRedirectUri,
    navigateToLoginRequestUrl: true,
  },
}

export const loginRequest: SilentRequest = {
  scopes: [`api://${currentClientId}/Modules.Edit`],
}
