import ContactAdminHomeButton from 'modules/contact/components/ContactAdminHomeButton'
import {allowedAzureGroups} from 'modules/contact/constants'
import {routes} from 'modules/contact/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const contactModule: Module = {
  allowedAzureGroups,
  HomeComponent: ContactAdminHomeButton,
  routes,
  slug: ModuleSlug.contact,
  title: 'Contact',
  type: ModuleType.contentManagement,
}
