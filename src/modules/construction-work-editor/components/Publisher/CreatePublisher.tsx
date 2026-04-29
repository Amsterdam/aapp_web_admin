import {Paragraph} from '@amsterdam/design-system-react'
import NavigationButton from '@/components/ui/button/NavigationButton'
import Column from '@/components/ui/layout/Column'
import ScreenTitle from '@/components/ui/text/ScreenTitle'
import PublisherForm from '@/modules/construction-work-editor/components/Publisher/PublisherForm'
import {ConstructionWorkEditorRoute} from '@/modules/construction-work-editor/types/routes'

const CreatePublisher = () => (
  <Column gutter="lg">
    <ScreenTitle title="Publisher toevoegen" />
    <Paragraph>
      Vul het e-mailadres in van de collega die je wilt toevoegen. In de
      volgende stap kun je projecten kiezen.
    </Paragraph>
    <PublisherForm />
    <NavigationButton
      label="Annuleren"
      url={ConstructionWorkEditorRoute.publishers}
      variant="secondary"
    />
  </Column>
)

export default CreatePublisher
