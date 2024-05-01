import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {ReleasesRoute} from 'modules/releases/types/routes'

const ReleasesHome = () => (
  <Row gutter="md">
    <NavigationButton flex label="Modules" url={ReleasesRoute.modules} />
    <NavigationButton flex label="Releases" url={ReleasesRoute.releases} />
  </Row>
)

export default ReleasesHome
