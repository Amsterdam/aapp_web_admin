import {Configuration, PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'
import {ReactNode, FC} from 'react'

const msalConfig: Configuration = {
  auth: {
    clientId: '',
    authority: '',
  },
}

const msalInstance = new PublicClientApplication(msalConfig)

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
