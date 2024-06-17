import {useState, useMemo} from 'react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Table from 'components/ui/table/Table'
import {ColumnConfig} from 'components/ui/table/types'
import {Publisher} from 'modules/construction-work-editor/types/publisher'
import {
  WithSearchString,
  addSearchString,
  filterBySearchStringMatch,
} from 'utils/searchString'

const columns: ColumnConfig<WithSearchString<Publisher>>[] = [
  {
    key: 'name',
    id: 'name',
    title: 'Naam',
  },
  {
    key: 'email',
    id: 'email',
    title: 'Email',
  },
  {
    key: 'projects',
    id: 'projects',
    renderer: ({projects}) => projects?.length,
    title: 'Aantal projecten',
  },
]

type Props = {
  isError: boolean
  isLoading: boolean
  publishers: Publisher[] | undefined
  onRowClick: (publisher: Publisher) => void
}

const PublishersTable = ({
  isError,
  isLoading,
  onRowClick,
  publishers,
}: Props) => {
  const [query, setQuery] = useState<string>()

  const searchablePublishers = useMemo(
    () => addSearchString(publishers, ['name', 'email']),
    [publishers],
  )

  const filteredPublishers = useMemo(
    () => filterBySearchStringMatch(searchablePublishers, query),
    [query, searchablePublishers],
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !publishers) {
    return (
      <ErrorComponent message="Er is iets misgegaan met het ophalen van publishers." />
    )
  }

  if (!publishers.length) {
    return <ErrorComponent message="Er zijn geen publishers gevonden." />
  }

  return (
    <Table
      config={columns}
      data={filteredPublishers}
      filterCallback={setQuery}
      filterQuery={query}
      keyGetter={({email}) => email}
      onRowClick={onRowClick}
    />
  )
}

export default PublishersTable
