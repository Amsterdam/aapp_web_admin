import {InteractionType} from '@azure/msal-browser'
import {useMsal, MsalAuthenticationTemplate} from '@azure/msal-react'
import {ReactNode, FC} from 'react'
import ErrorScreen from 'components/ui/screens/Error.screen'

type Props = {
  children: ReactNode
  interactionType?: InteractionType
}

const AuthenticationError = () => <ErrorScreen message="Inloggen is mislukt" />

export const LoginBoundary: FC<Props> = ({
  children,
  interactionType = InteractionType.Redirect,
}) => {
  const {instance} = useMsal()
  const accounts = instance.getAllAccounts()
  const activeAccount = instance.getActiveAccount()
  if (!activeAccount && accounts.length) {
    instance.setActiveAccount(accounts[0])
  }
  return (
    <MsalAuthenticationTemplate
      errorComponent={AuthenticationError}
      interactionType={interactionType}>
      {children}
    </MsalAuthenticationTemplate>
  )
}
