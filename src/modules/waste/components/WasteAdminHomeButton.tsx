import NavigationButton from 'components/ui/button/NavigationButton'
import {WasteRoute} from '../types'

const WasteAdminHomeButton = () => (
  <NavigationButton
    label="Beheer stadspas notificaties"
    url={WasteRoute.admin}
  />
)

export default WasteAdminHomeButton
