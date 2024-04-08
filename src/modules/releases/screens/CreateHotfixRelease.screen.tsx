import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import CreateRelease from 'modules/releases/components/CreateRelease'

type Params = {
  version?: string
}

const CreateHotfixReleaseScreen = () => {
  const {version: releaseVersion} = useParams<Params>()
  return (
    <Screen>
      <CreateRelease hotfixVersion={releaseVersion} />
    </Screen>
  )
}

export default CreateHotfixReleaseScreen
