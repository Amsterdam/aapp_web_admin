import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import Project from 'modules/construction-work-editor/components/Project'

type Params = {
  projectId: string
}

const ProjectScreen = () => {
  const {projectId} = useParams() as Params

  return (
    <Screen>
      <Project id={projectId} />
    </Screen>
  )
}

export default ProjectScreen
