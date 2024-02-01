import {Configuration, PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'
import {ReactNode, FC} from 'react'

const msalConfig: Configuration = {
  auth: {
    clientId: 'df8c1ff0-fbc7-4fdb-b67a-33b476f162ec',
    authority:
      'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804',
    // redirectUri: 'https://ontw.app.amsterdam.nl/mbs',
    // redirectUri: 'https://ontw.app.amsterdam.nl',
    // redirectUri: 'http://localhost:3000/mbs',
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

export const Init: FC<Props> = ({children}) => {
  if (!finished) {
    throw msalInstanceLoadingPromise
  }
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
