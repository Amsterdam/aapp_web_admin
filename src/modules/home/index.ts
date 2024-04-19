import {routes} from 'modules/home/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const homeModule: Module = {
  routes,
  slug: ModuleSlug.home,
  type: ModuleType.home,
}
