/* eslint-disable no-nested-ternary */
import {Paragraph} from '@amsterdam/design-system-react'
import ErrorComponent from 'components/ui/Error'
import Loading from 'components/ui/Loading'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {EditPublisherTable} from 'modules/construction-work-editor/components/Publisher/EditPublisherTable'
import {useGetPublisherQuery} from 'modules/construction-work-editor/services/publishers'

type Props = {
  id: string
}

const EditPublisher = ({id}: Props) => {
  const {data: publisher, isError, isLoading} = useGetPublisherQuery(Number(id))

  return (
    <Column gutter="lg">
      <ScreenTitle title="Projecten kiezen" />
      {isLoading ? (
        <Loading />
      ) : isError || !publisher ? (
        <ErrorComponent message="De projecten kunnen niet worden getoond" />
      ) : (
        <>
          <Paragraph>
            Kies de projecten die door{' '}
            <Phrase emphasis="strong">{publisher.email}</Phrase> beheerd mogen
            worden.
          </Paragraph>
          <EditPublisherTable id={publisher.id} />
        </>
      )}
    </Column>
  )
}

export default EditPublisher
