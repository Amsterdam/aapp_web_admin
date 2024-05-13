import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services/projects'
import {
  useGetPublisherQuery,
  useAddProjectsForPublisherMutation,
  useRemoveProjectsForPublisherMutation,
} from 'modules/construction-work-editor/services/publishers'
import ProjectsTable from '../ProjectsTable'

type Props = {
  email: string
}

export const EditPublisherTable = ({email}: Props) => {
  const {
    data: projects,
    isLoading: isGetProjectsLoading,
    isError: isGetProjectsError,
  } = useGetProjectsQuery()

  const {
    data: publisher,
    isLoading: isGetPublisherLoading,
    isError: isGetPublisherError,
  } = useGetPublisherQuery({email})

  const [
    addProjectsForPublisher,
    {isLoading: isAddProjectsForPublisherLoading},
  ] = useAddProjectsForPublisherMutation()

  const [
    removeProjectsForPublisher,
    {isLoading: isRemoveProjectsForPublisherLoading},
  ] = useRemoveProjectsForPublisherMutation()

  if (isGetProjectsLoading || isGetPublisherLoading) {
    return <Loading />
  }

  if (isGetProjectsError || isGetPublisherError || !projects?.length) {
    return <Error message="De projecten kunnen niet worden getoond" />
  }

  return (
    <ProjectsTable
      projects={projects}
      getIsRowSelected={({id}) => !!publisher?.projects.includes(id)}
      loading={
        isAddProjectsForPublisherLoading || isRemoveProjectsForPublisherLoading
      }
      onRowToggle={({id}, checked) => {
        if (checked) {
          addProjectsForPublisher({email, projectIds: [id]})

          return
        }
        removeProjectsForPublisher({email, projectIds: [id]})
      }}
    />
  )
}
