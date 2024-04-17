import {Paragraph} from '@amsterdam/design-system-react'
import Column from 'components/ui/layout/Column'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {CreatePublisherForm} from 'modules/construction-work-editor/components/Publisher/CreatePublisherForm'

const CreatePublisher = () => (
  <Column gutter="lg">
    <ScreenTitle title="Toevoegen" />
    <Paragraph>
      Vul het e-mailadres in van de collega die je wilt toevoegen. In de
      volgende stap kun je projecten kiezen.
    </Paragraph>
    <CreatePublisherForm />
  </Column>
)

export default CreatePublisher
