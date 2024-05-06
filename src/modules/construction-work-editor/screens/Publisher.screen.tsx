import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import CreatePublisher from 'modules/construction-work-editor/components/Publisher/CreatePublisher'
import EditPublisher from 'modules/construction-work-editor/components/Publisher/EditPublisher'

type Params = {
  email?: string
}

const PublisherScreen = () => {
  const {email} = useParams() as Params

  return (
    <Screen>
      {email ? <EditPublisher email={email} /> : <CreatePublisher />}
    </Screen>
  )
}

export default PublisherScreen
