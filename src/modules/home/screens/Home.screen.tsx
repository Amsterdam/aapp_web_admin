import {usePassTokenToNativeApp} from 'authentication/hooks/usePassTokenToNativeApp'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import PersonalizedHome from 'modules/home/components/PersonalizedHome'

const HomeScreen = () => {
  const isLoginApp = usePassTokenToNativeApp()
  if (isLoginApp) {
    return (
      <div className="Container">
        <Phrase>Aan het inloggen...</Phrase>
      </div>
    )
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
