import {ReactNode} from 'react'
import Screen from 'components/ui/layout/Screen'
import {LoginBoundary} from './LoginBoundary'

type Props = {
  children: ReactNode
}

/**
 * User needs to be authenticated to access this screen.
 */
const AuthProtectedScreen = ({children}: Props) => {
  return (
    <LoginBoundary>
      <Screen>{children}</Screen>
    </LoginBoundary>
  )
}

export default AuthProtectedScreen
