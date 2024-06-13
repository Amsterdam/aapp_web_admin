import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import BackToPublishersButton from '../components/Publisher/BackToPublishersButton'
import EditPublisherProjects from '../components/Publisher/EditPublisherProjects'

type Params = {
  id: string
}

const PublisherProjectsScreen = () => {
  const {id} = useParams() as Params

  return (
    <Screen>
      <EditPublisherProjects id={id} />
      <BackToPublishersButton />
    </Screen>
  )
}

export default PublisherProjectsScreen
