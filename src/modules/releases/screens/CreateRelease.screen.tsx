import AuthProtectedScreen from 'components/authentication/AuthProtected.screen'
import CreateRelease from 'modules/releases/components/CreateRelease'

const CreateReleaseScreen = () => (
  <AuthProtectedScreen>
    <CreateRelease />
  </AuthProtectedScreen>
)

export default CreateReleaseScreen
