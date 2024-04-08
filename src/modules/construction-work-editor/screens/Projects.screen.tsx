import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import {Table} from 'components/ui/table/Table'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {projects} from 'modules/data'

const ProjectsScreen = () => {
  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Amsterdam App" title="Projecten" />
        <Table
          columnNames={['id', 'date', 'title', 'age', 'location']}
          data={projects}
        />
      </Column>
    </Screen>
  )
}

export default ProjectsScreen
