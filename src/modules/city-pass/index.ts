import CityPassAdminHomeButton from 'modules/city-pass/components/CityPassAdminHomeButton'
import {allowedAzureRoles} from 'modules/city-pass/constants'
import {routes} from 'modules/city-pass/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const cityPassModule: Module = {
  allowedAzureRoles,
  HomeComponent: CityPassAdminHomeButton,
  routes,
  slug: ModuleSlug.cityPass,
  title: 'Stadspas',
  type: ModuleType.contentManagement,
}
