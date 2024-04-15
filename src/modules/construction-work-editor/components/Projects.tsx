import 'components/ui/table/Table.css'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import Error from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import {type Column} from 'components/ui/table/types'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services'
import type {ApiImage} from 'modules/construction-work-editor/types/image'
import type {ProjectBase} from 'modules/construction-work-editor/types/project'

const Projects = () => {
  const navigate = useNavigate()
  const {data, isError, isLoading} = useGetProjectsQuery({page_size: 1000})
  const projects = data?.result?.map(project => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
  }))

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

  const handleRowClick = useCallback(
    (project: ProjectBase) => {
      if (!project.id) return
      navigate(`/project/${project.id}`)
    },
    [navigate],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !projects?.length) {
    return <Error message="Projecten kunnen niet worden getoond" />
  }

  return <Table columns={columns} data={projects} onRowClick={handleRowClick} />
}

export default Projects
