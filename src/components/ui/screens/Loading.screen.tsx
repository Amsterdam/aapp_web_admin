import Loading from 'components/ui/Loading'
import Screen from 'components/ui/layout/Screen'

const LoadingScreen = () => (
  <Screen withLogin={false}>
    <Loading />
  </Screen>
)

export default LoadingScreen
