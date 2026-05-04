import {InteractionType} from '@azure/msal-browser'
import {MsalAuthenticationTemplate} from '@azure/msal-react'
import {ReactNode, FC} from 'react'
import {currentClientId} from '@/utils/environment'

type Props = {
  children?: ReactNode
  interactionType?: InteractionType
}

const authRequest = {
  scopes: [`api://${currentClientId}/Modules.Edit`],
}

const LoginBoundary: FC<Props> = ({
  children,
  interactionType = InteractionType.Redirect,
}) => {
  return (
    <MsalAuthenticationTemplate
      authenticationRequest={authRequest}
      interactionType={interactionType}>
      {children}
    </MsalAuthenticationTemplate>
  )
}

export default LoginBoundary
