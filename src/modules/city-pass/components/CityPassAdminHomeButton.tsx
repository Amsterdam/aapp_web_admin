import NavigationButton from 'components/ui/button/NavigationButton'
import {CityPassRoute} from '../types'

const CityPassAdminHomeButton = () => (
  <NavigationButton
    label="Beheer stadspas notificaties"
    url={CityPassRoute.admin}
  />
)

export default CityPassAdminHomeButton
