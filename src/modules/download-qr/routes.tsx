import {RouteObject} from 'react-router-dom'
import DownloadQRCodeScreen from 'modules/download-qr/screens/DownloadQRCode.screen'

export const routes: RouteObject[] = [
  {
    path: '/download-qr-code',
    element: <DownloadQRCodeScreen />,
  },
]
