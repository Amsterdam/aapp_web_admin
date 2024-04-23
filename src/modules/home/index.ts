import {AzureGroup} from 'authentication/types'
import {routes} from 'modules/home/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const homeModule: Module = {
  allowedAzureGroups: [
    AzureGroup.admin,
    AzureGroup.editor,
    AzureGroup.publisher,
  ],
  routes,
  slug: ModuleSlug.home,
  type: ModuleType.home,
}
