import {InteractionType} from '@azure/msal-browser'
import {useMsal, MsalAuthenticationTemplate} from '@azure/msal-react'
import {ReactNode, FC} from 'react'

type Props = {
  children: ReactNode
}

export const LoginBoundary: FC<Props> = ({children}) => {
  const {instance} = useMsal()
  const activeAccount = instance.getActiveAccount()
  // eslint-disable-next-line no-console
  console.log(activeAccount)
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      {children}
    </MsalAuthenticationTemplate>
  )
}
