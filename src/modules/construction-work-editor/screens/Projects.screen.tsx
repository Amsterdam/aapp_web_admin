import {AuthProtectedScreen} from 'components/authentication/AuthProtected.screen'
import Column from 'components/ui/layout/Column'
import {Table} from 'components/ui/table/Table'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {projects} from 'modules/data'

export const ProjectsScreen = () => {
  return (
    <AuthProtectedScreen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Amsterdam App" title="Projecten" />
        <Table
          columnNames={['id', 'date', 'title', 'age', 'location']}
          data={projects}
        />
      </Column>
    </AuthProtectedScreen>
  )
}
