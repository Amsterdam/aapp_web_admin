import {LoginBoundary} from 'authentication/components/LoginBoundary'
import {usePassTokenToNativeApp} from 'authentication/hooks/usePassTokenToNativeApp'

/**
 * Handles the login process for the native app.
 */
const NativeAppLogin = () => {
  const isLoginApp = usePassTokenToNativeApp()
  if (isLoginApp) {
    return <LoginBoundary>Aan het inloggen...</LoginBoundary>
  }
  return null
}

export default NativeAppLogin
