import SwaggerHome from 'modules/swagger/components/SwaggerHome'
import {allowedAzureGroups} from 'modules/swagger/constants'
import {routes} from 'modules/swagger/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const swaggerModule: Module = {
  allowedAzureGroups,
  HomeComponent: SwaggerHome,
  routes,
  slug: ModuleSlug.downloadQr,
  title: 'API documentatie',
  type: ModuleType.other,
}
