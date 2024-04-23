import {RouteObject} from 'react-router-dom'
import DownloadQRCodeScreen from 'modules/download-qr/screens/DownloadQRCode.screen'
import {downloadQrModule} from '.'

export enum DownloadQRCodeRoute {
  downloadQRCode = '/download-qr-code',
}

const loader = () => downloadQrModule.allowedAzureGroups

export const routes: RouteObject[] = [
  {
    loader,
    path: DownloadQRCodeRoute.downloadQRCode,
    element: <DownloadQRCodeScreen />,
  },
]
