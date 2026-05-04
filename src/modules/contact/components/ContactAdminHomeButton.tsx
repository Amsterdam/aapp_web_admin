import NavigationButton from '@/components/ui/button/NavigationButton'
import {ContactRoute} from '../types'

const ContactAdminHomeButton = () => (
  <NavigationButton
    label="Beheer openingstijden stadsloketten"
    url={ContactRoute.admin}
  />
)

export default ContactAdminHomeButton
