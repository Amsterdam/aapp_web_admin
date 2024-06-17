import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import CreatePublisher from 'modules/construction-work-editor/components/Publisher/CreatePublisher'
import EditPublisher from 'modules/construction-work-editor/components/Publisher/EditPublisher'

type Params = {
  id?: string
}

const PublisherScreen = () => {
  const {id} = useParams() as Params

  return (
    <Screen>
      {id === 'nieuw' ? <CreatePublisher /> : id && <EditPublisher id={id} />}
    </Screen>
  )
}

export default PublisherScreen
