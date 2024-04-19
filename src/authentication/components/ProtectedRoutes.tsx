import {InteractionType} from '@azure/msal-browser'
import {useMsal, MsalAuthenticationTemplate} from '@azure/msal-react'
import {FC} from 'react'
import {Outlet} from 'react-router-dom'
import ErrorScreen from 'components/ui/screens/Error.screen'

type Props = {
  interactionType?: InteractionType
}

const AuthenticationError = () => <ErrorScreen message="Inloggen is mislukt" />

export const ProtectedRoutes: FC<Props> = ({
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
      <Outlet />
    </MsalAuthenticationTemplate>
  )
}
