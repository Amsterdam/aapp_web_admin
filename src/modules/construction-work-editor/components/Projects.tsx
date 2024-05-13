import {useCallback} from 'react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import useNavigate from 'hooks/useNavigate'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services/projects'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import ProjectsTable from './ProjectsTable'
import type {ProjectsItem} from 'modules/construction-work-editor/types/project'

const Projects = () => {
  const navigate = useNavigate()
  const {data: projects, isError, isLoading} = useGetProjectsQuery()

  const handleRowClick = useCallback(
    (project: ProjectsItem) => {
      if (!project.id) {
        return
      }
      navigate(ConstructionWorkEditorRoute.project, {
        projectId: project.id,
      })
    },
    [navigate],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !projects) {
    return (
      <ErrorComponent message="Werkzaamheden kunnen niet worden getoond." />
    )
  }

  if (!projects.length) {
    return <ErrorComponent message="Er zijn geen werkzaamheden gevonden." />
  }

  return <ProjectsTable projects={projects} onRowClick={handleRowClick} />
}

export default Projects
