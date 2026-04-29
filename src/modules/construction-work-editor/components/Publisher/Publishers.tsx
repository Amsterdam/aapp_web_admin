import {useCallback, useMemo} from 'react'
import NavigationButton from '@/components/ui/button/NavigationButton'
import useNavigate from '@/hooks/useNavigate'
import {useGetPublishersQuery} from '@/modules/construction-work-editor/services/publishers'
import {ConstructionWorkEditorRoute} from '@/modules/construction-work-editor/types/routes'
import PublishersTable from './PublishersTable'
import type {Publisher} from '@/modules/construction-work-editor/types/publisher'

const Publishers = () => {
  const navigate = useNavigate()
  const {data: publishers, isError, isLoading} = useGetPublishersQuery()

  // TODO: Remove once generic sorting mechanism is implemented
  const publishersSortedByName = useMemo(() => {
    if (!publishers) {
      return []
    }

    return [...publishers].sort((a, b) => a.name.localeCompare(b.name))
  }, [publishers])

  const onRowClick = useCallback(
    ({id}: Publisher) => {
      navigate(ConstructionWorkEditorRoute.publisher, {
        id,
      })
    },
    [navigate],
  )

  return (
    <>
      <PublishersTable
        isError={isError}
        isLoading={isLoading}
        onRowClick={onRowClick}
        publishers={publishersSortedByName}
      />
      <NavigationButton
        label="Maak publisher aan"
        url={ConstructionWorkEditorRoute.publisherNew}
      />
    </>
  )
}

export default Publishers
