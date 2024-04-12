import {Params, useParams} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ErrorScreen from 'components/ui/screens/Error.screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import EditPublisher from 'modules/construction-work-editor/components/EditPublisher'

const EditPublisherScreen = () => {
  const {id} = useParams<Params>()

  if (!id) {
    return <ErrorScreen message="Dit id is niet bekend." />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle={`Welkom ${id}`} title="Aanmaken OM/CA" />
        <EditPublisher id={id} />
      </Column>
    </Screen>
  )
}

export default EditPublisherScreen
