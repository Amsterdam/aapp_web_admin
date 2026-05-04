import DownloadQrHome from '@/modules/download-qr/components/DownloadQrHome'
import {allowedAzureRoles} from '@/modules/download-qr/constants'
import {routes} from '@/modules/download-qr/routes'
import {ModuleSlug, ModuleType, type Module} from '@/modules/types'

export const downloadQrModule: Module = {
  allowedAzureRoles,
  HomeComponent: DownloadQrHome,
  routes,
  slug: ModuleSlug.downloadQr,
  title: 'QR code maker',
  type: ModuleType.other,
}
