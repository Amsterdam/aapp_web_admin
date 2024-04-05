import {useParams} from 'react-router-dom'
import {AuthProtectedScreen} from 'components/authentication/AuthProtected.screen'
import CreateRelease from '../components/CreateRelease'

type Params = {
  version?: string
}

const CreateHotfixReleaseScreen = () => {
  const {version: releaseVersion} = useParams<Params>()
  return (
    <AuthProtectedScreen>
      <CreateRelease hotfixVersion={releaseVersion} />
    </AuthProtectedScreen>
  )
}

export default CreateHotfixReleaseScreen
