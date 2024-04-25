import {InteractionType} from '@azure/msal-browser'
import {useMsal, MsalAuthenticationTemplate} from '@azure/msal-react'
import {ReactNode, FC} from 'react'

type Props = {
  children?: ReactNode
  interactionType?: InteractionType
}

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
    <MsalAuthenticationTemplate interactionType={interactionType}>
      {children}
    </MsalAuthenticationTemplate>
  )
}
