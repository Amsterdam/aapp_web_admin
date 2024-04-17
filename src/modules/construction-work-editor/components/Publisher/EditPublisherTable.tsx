import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import {ColumnConfig} from 'components/ui/table/types'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import {
  useAddProjectsForPublisherMutation,
  useGetProjectsQuery,
  useGetPublisherQuery,
  useRemoveProjectsForPublisherMutation,
} from 'modules/construction-work-editor/services'
import {ProjectsItem} from 'modules/construction-work-editor/types/project'

type Props = {
  email: string
}

const columns: ColumnConfig<ProjectsItem>[] = [
  {
    id: 'image',
    key: 'image',
    renderer: ({image}) => image && <Image image={image} />,
  },
  {
    id: 'title',
    key: 'title',
    renderer: ({title, subtitle}) => (
      <>
        <Title level={3}>{title}</Title>
        <Phrase>{subtitle}</Phrase>
      </>
    ),
    title: 'Titel',
  },
]

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

  if (isGetProjectsError || isGetPublisherError || !projects?.result.length) {
    return <Error message="De projecten kunnen niet worden getoond" />
  }

  return (
    <Table
      config={columns}
      data={projects.result}
      isRowChecked={({id}) => !!publisher?.projects.includes(id)}
      loading={
        isAddProjectsForPublisherLoading || isRemoveProjectsForPublisherLoading
      }
      keyGetter={({id}, affix = '') => `${affix}${id.toString()}`}
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
