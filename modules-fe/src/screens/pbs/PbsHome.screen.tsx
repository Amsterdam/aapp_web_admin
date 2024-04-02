import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Table from 'components/ui/table/Table'
import ScreenTitle from 'components/ui/text/ScreenTitle'

const HomeScreen = () => {
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Amsterdam App"
          title="Projectbeheersysteem"
        />
        <Table />
      </Column>
    </Screen>
  )
}

export default HomeScreen
