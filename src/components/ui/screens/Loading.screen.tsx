import Loading from '@/components/ui/Loading'
import Screen from '@/components/ui/layout/Screen'

const LoadingScreen = () => (
  <Screen requireLogin={false}>
    <Loading />
  </Screen>
)

export default LoadingScreen
