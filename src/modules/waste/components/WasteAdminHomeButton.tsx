import NavigationButton from 'components/ui/button/NavigationButton'
import {WasteRoute} from '../types'

const WasteAdminHomeButton = () => (
  <NavigationButton label="Beheer A&G notificaties" url={WasteRoute.admin} />
)

export default WasteAdminHomeButton
