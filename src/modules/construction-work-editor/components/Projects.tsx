import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import {type Column} from 'components/ui/table/types'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/routes'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services'
import type {ProjectBase} from 'modules/construction-work-editor/types/project'

const columns: Column<ProjectBase>[] = [
  {
    title: 'Titel',
    content: [{key: 'title'}, {key: 'subtitle'}],
  },
  {
    title: '',
    content: [
      {
        key: 'image',
        renderer: ({image}) => image && <Image image={image} />,
      },
    ],
  },
]

const Projects = () => {
  const navigate = useNavigate()
  const {data, isError, isLoading} = useGetProjectsQuery()
  const projects = data?.result?.map(project => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
    image: project.image,
  }))

  const handleRowClick = useCallback(
    (project: ProjectBase) => {
      if (!project.id) return
      navigate(`${ConstructionWorkEditorRoute.project}/${project.id}`)
    },
    [navigate],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !projects?.length) {
    return <ErrorComponent message="Projecten kunnen niet worden getoond" />
  }

  return (
    <Table
      columns={columns}
      data={projects}
      keyGetter={({id}) => id.toString()}
      onRowClick={handleRowClick}
    />
  )
}

export default Projects
