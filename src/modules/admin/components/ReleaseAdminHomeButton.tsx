import NavigationButton from 'components/ui/button/NavigationButton'
import {ReleaseRoute} from '../types'

const ReleaseAdminHomeButton = () => (
  <NavigationButton
    label="Module beheer systeem"
    url={ReleaseRoute.admin}
  />
)

export default ReleaseAdminHomeButton
