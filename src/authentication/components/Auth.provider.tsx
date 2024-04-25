import {Configuration, PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'
import {ReactNode, FC} from 'react'
import {currentClientId, currentRedirectUri} from 'utils/environment'

const msalConfig: Configuration = {
  auth: {
    clientId: currentClientId,
    authority:
      'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804',
    redirectUri: currentRedirectUri,
    navigateToLoginRequestUrl: true,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

let finished = false
const msalInstanceLoadingPromise = msalInstance.initialize().then(() => {
  finished = true
  // eslint-disable-next-line no-console
}, console.error)

type Props = {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({children}) => {
  if (!finished) {
    throw msalInstanceLoadingPromise
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
