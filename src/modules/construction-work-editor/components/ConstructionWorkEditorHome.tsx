import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

const ConstructionWorkEditorHome = () => (
  <Row gutter="md">
    <NavigationButton
      flex
      label="Projecten"
      route={ConstructionWorkEditorRoute.projects}
    />
    <NavigationButton
      flex
      label="Redacteuren"
      route={ConstructionWorkEditorRoute.publishers}
    />
  </Row>
)

export default ConstructionWorkEditorHome
