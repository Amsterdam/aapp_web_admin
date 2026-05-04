import {ModuleSlug, ModuleType, type Module} from '@/modules/types'
import WasteAdminHomeButton from '@/modules/waste/components/WasteAdminHomeButton'
import {allowedAzureRoles} from '@/modules/waste/constants'
import {routes} from '@/modules/waste/routes'

export const wasteModule: Module = {
  allowedAzureRoles,
  HomeComponent: WasteAdminHomeButton,
  routes,
  slug: ModuleSlug.waste,
  title: 'A&G notificaties',
  type: ModuleType.contentManagement,
}
