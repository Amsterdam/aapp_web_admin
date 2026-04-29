/* eslint-disable no-nested-ternary */
import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import ErrorComponent from '@/components/ui/Error'
import Loading from '@/components/ui/Loading'
import NavigationButton from '@/components/ui/button/NavigationButton'
import Column from '@/components/ui/layout/Column'
import ScreenTitle from '@/components/ui/text/ScreenTitle'
import PublisherForm from '@/modules/construction-work-editor/components/Publisher/PublisherForm'
import RemovePublisher from '@/modules/construction-work-editor/components/Publisher/RemovePublisher'
import {useGetPublisherQuery} from '@/modules/construction-work-editor/services/publishers'
import {ConstructionWorkEditorRoute} from '@/modules/construction-work-editor/types/routes'

type Props = {
  id: string
}

const EditPublisher = ({id}: Props) => {
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {
    data: publisher,
    isError,
    isLoading,
  } = useGetPublisherQuery(!isBeforeNavigation ? Number(id) : skipToken)

  return (
    <Column gutter="lg">
      {isLoading ? (
        <Loading />
      ) : isError || !publisher ? (
        <ErrorComponent message="De gegevens kunnen niet worden geladen." />
      ) : (
        <>
          <ScreenTitle title="Publisher aanpassen" />
          <PublisherForm
            email={publisher.email}
            id={publisher.id}
            name={publisher.name}
          />
          <NavigationButton
            label="Projecten kiezen"
            url={ConstructionWorkEditorRoute.publisherProjects}
            params={{id: publisher.id}}
            variant="secondary"
          />
          <NavigationButton
            label="Annuleren"
            url={ConstructionWorkEditorRoute.publishers}
            variant="secondary"
          />
          {!!id && (
            <RemovePublisher
              id={publisher.id}
              name={publisher.name}
              setIsBeforeNavigation={setIsBeforeNavigation}
            />
          )}
        </>
      )}
    </Column>
  )
}

export default EditPublisher
