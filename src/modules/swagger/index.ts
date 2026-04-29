import SwaggerHome from '@/modules/swagger/components/SwaggerHome'
import {allowedAzureRoles} from '@/modules/swagger/constants'
import {routes} from '@/modules/swagger/routes'
import {ModuleSlug, ModuleType, type Module} from '@/modules/types'

export const swaggerModule: Module = {
  allowedAzureRoles,
  HomeComponent: SwaggerHome,
  routes,
  slug: ModuleSlug.downloadQr,
  title: 'API documentatie',
  type: ModuleType.other,
}
