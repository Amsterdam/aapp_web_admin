import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {ReleasesRoute} from 'modules/releases/types/routes'

const ReleasesHome = () => (
  <Row gutter="md">
    <NavigationButton flex label="Modules" route={ReleasesRoute.modules} />
    <NavigationButton flex label="Releases" route={ReleasesRoute.releases} />
  </Row>
)

export default ReleasesHome
