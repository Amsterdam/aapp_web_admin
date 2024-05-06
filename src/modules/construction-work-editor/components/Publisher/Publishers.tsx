import {useCallback, useMemo, useState} from 'react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import {Table} from 'components/ui/table/Table'
import useNavigate from 'hooks/useNavigate'
import {useGetPublishersQuery} from 'modules/construction-work-editor/services/publishers'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import {
  WithSearchString,
  addSearchString,
  filterBySearchStringMatch,
} from 'utils/searchString'
import type {ColumnConfig} from 'components/ui/table/types'
import type {Publisher} from 'modules/construction-work-editor/types/publisher'

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

const Publishers = () => {
  const navigate = useNavigate()
  const {data: publishers, isError, isLoading} = useGetPublishersQuery()

  const onRowClick = useCallback(
    ({email}: Publisher) => {
      navigate(ConstructionWorkEditorRoute.publisher, {
        email,
      })
    },
    [navigate],
  )

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

export default Publishers
