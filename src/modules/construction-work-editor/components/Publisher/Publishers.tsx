import {useCallback} from 'react'
import NavigationButton from 'components/ui/button/NavigationButton'
import useNavigate from 'hooks/useNavigate'
import {useGetPublishersQuery} from 'modules/construction-work-editor/services/publishers'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'
import PublishersTable from './PublishersTable'
import type {Publisher} from 'modules/construction-work-editor/types/publisher'

const Publishers = () => {
  const navigate = useNavigate()
  const {data: publishers, isError, isLoading} = useGetPublishersQuery()

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
        publishers={publishers}
      />
      <NavigationButton
        label="Maak publisher aan"
        url={ConstructionWorkEditorRoute.publisher}
      />
    </>
  )
}

export default Publishers
