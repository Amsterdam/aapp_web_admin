import {RouteObject} from 'react-router-dom'
import {downloadQrModule} from '@/modules/download-qr'
import DownloadQRCodeScreen from '@/modules/download-qr/screens/DownloadQRCode.screen'
import {DownloadQRCodeRoute} from '@/modules/download-qr/types'

const loader = () => downloadQrModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: DownloadQRCodeRoute.downloadQRCode,
    element: <DownloadQRCodeScreen />,
  },
]
