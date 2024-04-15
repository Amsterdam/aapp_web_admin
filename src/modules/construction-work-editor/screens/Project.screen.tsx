import {useParams} from 'react-router-dom'
import Project from '../components/Project'

type Params = {
  id: string
}

const ProjectScreen = () => {
  const {id} = useParams<Params>()

  return <Project id={id} />
}

export default ProjectScreen
