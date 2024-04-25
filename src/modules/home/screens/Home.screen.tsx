import {LoginBoundary} from 'authentication/components/LoginBoundary'
import {usePassTokenToNativeApp} from 'authentication/hooks/usePassTokenToNativeApp'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import PersonalizedHome from 'modules/home/components/PersonalizedHome'

const HomeScreen = () => {
  const isLoginApp = usePassTokenToNativeApp()
  if (isLoginApp) {
    return <LoginBoundary>Aan het inloggen...</LoginBoundary>
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Amsterdam App" />
        <PersonalizedHome />
      </Column>
    </Screen>
  )
}

export default HomeScreen
