import ReleasesHome from 'modules/releases/components/ReleasesHome'
import {allowedAzureGroups} from 'modules/releases/constants'
import {routes} from 'modules/releases/routes'
import {releaseSlice} from 'modules/releases/slices/release.slice'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const releasesModule: Module<typeof releaseSlice> = {
  allowedAzureGroups,
  HomeComponent: ReleasesHome,
  reduxSlice: releaseSlice,
  routes,
  slug: ModuleSlug.releases,
  type: ModuleType.contentManagement,
}
