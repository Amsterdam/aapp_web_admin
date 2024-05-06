import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import Publishers from 'modules/construction-work-editor/components/Publisher/Publishers'

const PublishersScreen = () => (
  <Screen>
    <Column gutter="lg">
      <ScreenTitle subtitle="Amsterdam App" title="Publishers" />
      <Publishers />
    </Column>
  </Screen>
)

export default PublishersScreen
