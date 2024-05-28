import NavigationButton from 'components/ui/button/NavigationButton'
import {DownloadQRCodeRoute} from 'modules/download-qr/types'

const DownloadQrHome = () => (
  <NavigationButton
    label="Download link QR code maker"
    url={DownloadQRCodeRoute.downloadQRCode}
  />
)

export default DownloadQrHome
