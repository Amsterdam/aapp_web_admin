import {AzureGroup} from 'authentication/types'
import ReleasesHome from 'modules/releases/components/ReleasesHome'
import {routes} from 'modules/releases/routes'
import {releaseSlice} from 'modules/releases/slices/release.slice'
import {ModuleSlug, type Module} from 'modules/types'

export const releasesModule: Module<typeof releaseSlice> = {
  allowedAzureGroups: [AzureGroup.admin],
  HomeComponent: ReleasesHome,
  reduxSlice: releaseSlice,
  routes,
  slug: ModuleSlug.releases,
}
