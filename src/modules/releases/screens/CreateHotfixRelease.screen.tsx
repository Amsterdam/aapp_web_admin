import {useParams} from 'react-router-dom'
import CreateRelease from '../components/CreateRelease'

type Params = {
  version?: string
}

const CreateHotfixReleaseScreen = () => {
  const {version: releaseVersion} = useParams<Params>()
  return <CreateRelease hotfixVersion={releaseVersion} />
}

export default CreateHotfixReleaseScreen
