import NavigationButton from 'components/ui/button/NavigationButton'
import {SwaggerRoute} from 'modules/swagger/types'

const SwaggerHome = () => (
  <NavigationButton label="Swagger" url={SwaggerRoute.swagger} />
)

export default SwaggerHome
