import ContactAdminHomeButton from 'modules/contact/components/ContactAdminHomeButton'
import {routes} from 'modules/contact/routes'
import {allowedAzureGroups} from 'modules/download-qr/constants'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const contactModule: Module = {
  allowedAzureGroups,
  HomeComponent: ContactAdminHomeButton,
  routes,
  slug: ModuleSlug.contact,
  title: 'Contact',
  type: ModuleType.contentManagement,
}
