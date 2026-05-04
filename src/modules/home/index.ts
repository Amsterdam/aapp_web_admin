import {allowedAzureRoles} from '@/modules/home/constants'
import {routes} from '@/modules/home/routes'
import {ModuleSlug, ModuleType, type Module} from '@/modules/types'

export const homeModule: Module = {
  allowedAzureRoles,
  routes,
  slug: ModuleSlug.home,
  title: 'Home',
  type: ModuleType.home,
}
