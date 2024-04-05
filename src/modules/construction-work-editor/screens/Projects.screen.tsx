import {AuthProtectedScreen} from 'components/authentication/AuthProtected.screen'

export const ProjectsScreen = () => {
  return (
    <AuthProtectedScreen>
      <h1>Projects</h1>
    </AuthProtectedScreen>
  )
}
