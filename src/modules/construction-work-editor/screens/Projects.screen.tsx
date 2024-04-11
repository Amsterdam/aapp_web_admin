import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import Projects from 'modules/construction-work-editor/components/Projects'

const ProjectsScreen = () => (
  <Screen>
    <Column gutter="lg">
      <ScreenTitle subtitle="Amsterdam App" title="Projecten" />
      <Projects />
    </Column>
  </Screen>
)

export default ProjectsScreen
