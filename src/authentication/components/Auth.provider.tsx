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
await msalInstance.initialize()

type Props = {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({children}) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
