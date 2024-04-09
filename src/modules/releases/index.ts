import {routes} from 'modules/releases/routes'
import {releaseSlice} from 'modules/releases/slices/release.slice'
import {type Module} from 'modules/types'

export const releasesModule: Module<typeof releaseSlice> = {
  reduxSlice: releaseSlice,
  routes,
}
