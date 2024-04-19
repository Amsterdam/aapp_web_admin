import {useMemo, useState} from 'react'
import Image from 'components/ui/media/Image'
import {Table} from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import Title from 'components/ui/text/Title'
import {
  WithSearchString,
  addSearchString,
  filterBySearchStringMatch,
} from 'utils/searchString'
import type {ColumnConfig, TableProps} from 'components/ui/table/types'
import type {ProjectsItem} from 'modules/construction-work-editor/types/project'

type Props = {
  projects: ProjectsItem[]
} & Pick<
  TableProps<WithSearchString<ProjectsItem>>,
  'getIsRowSelected' | 'loading' | 'onRowClick' | 'onRowToggle'
>

const columns: ColumnConfig<WithSearchString<ProjectsItem>>[] = [
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

const ProjectsTable = ({projects, ...tableProps}: Props) => {
  const [query, setQuery] = useState<string>()

  const searchableProjects = useMemo(
    () => addSearchString(projects, ['title', 'subtitle']),
    [projects],
  )

  const filteredProjects = useMemo(
    () => filterBySearchStringMatch(searchableProjects, query),
    [searchableProjects, query],
  )

  return (
    <Table
      {...tableProps}
      config={columns}
      data={filteredProjects}
      filterCallback={setQuery}
      keyGetter={({id}) => id.toString()}
    />
  )
}

export default ProjectsTable
