import {allowedAzureGroups} from 'modules/home/constants'
import {routes} from 'modules/home/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const homeModule: Module = {
  allowedAzureGroups,
  routes,
  slug: ModuleSlug.home,
  title: 'Home',
  type: ModuleType.home,
}
