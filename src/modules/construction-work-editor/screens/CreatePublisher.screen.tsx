import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import CreatePublisher from 'modules/construction-work-editor/components/CreatePublisher'

const CreatePublisherScreen = () => {
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Maak een OM/CA aan" title="Aanmaken OM/CA" />
        <CreatePublisher />
      </Column>
    </Screen>
  )
}

export default CreatePublisherScreen
