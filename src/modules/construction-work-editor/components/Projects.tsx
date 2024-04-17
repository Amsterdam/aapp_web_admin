import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/routes'
import {useGetProjectsQuery} from 'modules/construction-work-editor/services'
import type {ColumnConfig} from 'components/ui/table/types'
import type {ProjectBase} from 'modules/construction-work-editor/types/project'

const columns: ColumnConfig<ProjectBase>[] = [
  {
    key: 'title',
    id: 'title',
    renderer: ({title, subtitle}) => (
      <>
        <Title level={3}>{title}</Title>
        <Phrase>{subtitle}</Phrase>
      </>
    ),
    title: 'Titel',
  },
  {
    key: 'image',
    id: 'image',
    renderer: ({image}) => image && <Image image={image} />,
    title: '',
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
      config={columns}
      data={projects}
      keyGetter={({id}, affix = '') => `${affix}${id.toString()}`}
      onRowClick={handleRowClick}
    />
  )
}

export default Projects
