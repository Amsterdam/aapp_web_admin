import {Paragraph} from '@amsterdam/design-system-react'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'

type Props = {
  email: string
}

// TODO: this will follow
const EditPublisherTable = (_props: Props) => null

const EditPublisher = ({email}: Props) => (
  <Column gutter="lg">
    <ScreenTitle title="Projecten kiezen" />
    <Paragraph>
      Kies de projecten die door <Phrase emphasis="strong">{email}</Phrase>{' '}
      beheerd mogen worden.
    </Paragraph>
    <EditPublisherTable email={email} />
  </Column>
)

export default EditPublisher
