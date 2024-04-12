import {FormProvider, useForm} from 'react-hook-form'
import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Box from 'components/ui/layout/Box'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import {type Column} from 'components/ui/table/types'
import Phrase from 'components/ui/text/Phrase'
// import {useGetPublisherQuery} from '../services/publisher'
import {useGetProjectsQuery} from '../services/projects'
import {ProjectBase, ApiImage} from '../types/projects'

type Props = {
  id: string
}

const EditPublisher = ({id}: Props) => {
  // TODO: Get the right data from endpoint Publisher once BE is done
  //   const {data, isLoading, isError} = useGetPublisherQuery({id})

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery({page_size: 10})

  const form = useForm()

  const columns: Column<ProjectBase, ApiImage | null>[] = [
    {
      title: 'Titel',
      content: [{key: 'title'}, {key: 'subtitle'}],
    },
    {
      title: '',
      content: [
        {
          key: 'image',
          renderer: image => image && <Image image={image} />,
        },
      ],
    },
  ]
  if (isProjectsLoading) {
    return <Loading />
  }

  if (isProjectsError || !projects?.result.length) {
    return <Error message="Projecten kunnen niet worden getoond" />
  }

  return (
    <Box>
      <Phrase>Edit {id}</Phrase>
      <FormProvider {...form}>
        <Table data={projects.result} columns={columns} isSelectable />
      </FormProvider>
    </Box>
  )
}

export default EditPublisher
