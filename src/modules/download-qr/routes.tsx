import {RouteObject} from 'react-router-dom'
import DownloadQRCodeScreen from 'modules/download-qr/screens/DownloadQRCode.screen'

export enum DownloadQRCodeRoute {
  downloadQRCode = '/download-qr-code',
}

export const routes: RouteObject[] = [
  {
    path: DownloadQRCodeRoute.downloadQRCode,
    element: <DownloadQRCodeScreen />,
  },
]
