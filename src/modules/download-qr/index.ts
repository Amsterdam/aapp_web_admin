import DownloadQrHome from 'modules/download-qr/components/DownloadQrHome'
import {allowedAzureGroups} from 'modules/download-qr/constants'
import {routes} from 'modules/download-qr/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

export const downloadQrModule: Module = {
  allowedAzureGroups,
  HomeComponent: DownloadQrHome,
  routes,
  slug: ModuleSlug.downloadQr,
  title: 'QR code maker',
  type: ModuleType.other,
}
