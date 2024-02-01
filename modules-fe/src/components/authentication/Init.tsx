import {Configuration, PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'
import {ReactNode, FC} from 'react'
import {Environment, environment} from 'utils/environment'

const environmentClientId: Record<Environment, string> = {
  [Environment.local]: 'df8c1ff0-fbc7-4fdb-b67a-33b476f162ec', // the same as dev
  [Environment.development]: 'df8c1ff0-fbc7-4fdb-b67a-33b476f162ec',
  [Environment.test]: '',
  [Environment.acceptance]: '',
  [Environment.production]: '',
}

const msalConfig: Configuration = {
  auth: {
    clientId: environmentClientId[environment],
    authority:
      'https://login.microsoftonline.com/72fca1b1-2c2e-4376-a445-294d80196804',
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
