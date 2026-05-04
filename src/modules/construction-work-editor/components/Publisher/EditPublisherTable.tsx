import {useEffect, useState} from 'react'
import ErrorComponent from '@/components/ui/Error'
import Loading from '@/components/ui/Loading'
import {useGetProjectsQuery} from '@/modules/construction-work-editor/services/projects'
import {
  useGetPublisherQuery,
  useAddProjectsForPublisherMutation,
  useRemoveProjectsForPublisherMutation,
} from '@/modules/construction-work-editor/services/publishers'
import {ProjectsItem} from '@/modules/construction-work-editor/types/project'
import {Publisher} from '@/modules/construction-work-editor/types/publisher'
import ProjectsTable from '../ProjectsTable'

type Props = {
  id: Publisher['id']
}

const EditPublisherTable = ({id}: Props) => {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery()

  const {
    data: publisher,
    isFetching: isGetPublisherFetching,
    isLoading: isGetPublisherLoading,
    isError: isGetPublisherError,
  } = useGetPublisherQuery(id)
  const publisherProjects = publisher?.projects

  const [projectsSortedByPublished, setProjectsSortedByPublished] = useState<
    ProjectsItem[]
  >([])

  const [
    addProjectsForPublisher,
    {isLoading: isAddProjectsForPublisherLoading},
  ] = useAddProjectsForPublisherMutation()

  const [
    removeProjectsForPublisher,
    {isLoading: isRemoveProjectsForPublisherLoading},
  ] = useRemoveProjectsForPublisherMutation()

  // TODO: Remove once generic sorting mechanism is implemented
  useEffect(() => {
    if (projects && publisherProjects && !projectsSortedByPublished.length) {
      setProjectsSortedByPublished(
        [...projects].sort((a, b) => {
          if (
            publisherProjects.includes(b.id) ===
            publisherProjects.includes(a.id)
          ) {
            return 0
          }
          if (publisherProjects.includes(b.id)) {
            return 1
          }

          return -1
        }),
      )
    }
  }, [projects, projectsSortedByPublished, publisherProjects])

  if (isProjectsLoading || isGetPublisherLoading) {
    return <Loading />
  }

  if (isProjectsError || isGetPublisherError || !projects?.length) {
    return <ErrorComponent message="De projecten kunnen niet worden getoond" />
  }

  return (
    <ProjectsTable
      projects={projectsSortedByPublished}
      getIsRowSelected={({id: projectId}) =>
        !!publisher?.projects?.includes(projectId)
      }
      loading={
        isAddProjectsForPublisherLoading ||
        isRemoveProjectsForPublisherLoading ||
        isGetPublisherFetching
      }
      onRowToggle={({id: projectId}, checked) => {
        if (checked) {
          addProjectsForPublisher({id, projectId})

          return
        }
        removeProjectsForPublisher({id, projectId})
      }}
    />
  )
}

export default EditPublisherTable
