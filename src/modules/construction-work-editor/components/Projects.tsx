import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services/projects'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import getUrl from 'utils/getUrl'
import ProjectsTable from './ProjectsTable'
import type {ProjectsItem} from 'modules/construction-work-editor/types/project'

const Projects = () => {
  const navigate = useNavigate()
  const {data, isError, isLoading} = useGetProjectsQuery()

  const handleRowClick = useCallback(
    (project: ProjectsItem) => {
      if (!project.id) {
        return
      }
      navigate(
        getUrl(ConstructionWorkEditorRoute.project, {
          projectId: project.id,
        }),
      )
    },
    [navigate],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !data?.result?.length) {
    return <ErrorComponent message="Projecten kunnen niet worden getoond" />
  }

  return <ProjectsTable projects={data.result} onRowClick={handleRowClick} />
}

export default Projects
