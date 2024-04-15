import {useParams} from 'react-router-dom'
import Screen from 'components/ui/layout/Screen'
import Project from 'modules/construction-work-editor/components/Project'

type Params = {
  id: string
}

const ProjectScreen = () => {
  const {id} = useParams<Params>()

  return (
    <Screen>
      <Project id={id} />
    </Screen>
  )
}

export default ProjectScreen
