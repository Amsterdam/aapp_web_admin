import {AzureGroup} from 'authentication/types'
import DownloadQrHome from 'modules/download-qr/components/DownloadQrHome'
import {routes} from 'modules/download-qr/routes'
import {ModuleSlug, type Module} from 'modules/types'

export const downloadQrModule: Module = {
  allowedAzureGroups: [AzureGroup.admin],
  HomeComponent: DownloadQrHome,
  routes,
  slug: ModuleSlug.downloadQr,
}
