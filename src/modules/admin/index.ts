import ReleaseAdminHomeButton from 'modules/admin/components/ReleaseAdminHomeButton'
import {allowedAzureRoles} from 'modules/admin/constants'
import {routes} from 'modules/admin/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const adminModule: Module = {
  allowedAzureRoles,
  HomeComponent: ReleaseAdminHomeButton,
  routes,
  slug: ModuleSlug.releases,
  title: 'Admin',
  type: ModuleType.contentManagement,
}
