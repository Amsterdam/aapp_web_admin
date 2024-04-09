import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import CreateManagerForm from 'modules/construction-work-editor/components/CreateManagerForm'

const CreateManagerScreen = () => {
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Maak een OM/CA aan" title="Aanmaken OM/CA" />
        <CreateManagerForm />
      </Column>
    </Screen>
  )
}

export default CreateManagerScreen
