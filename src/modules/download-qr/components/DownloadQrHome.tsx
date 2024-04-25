import NavigationButton from 'components/ui/button/NavigationButton'
import Row from 'components/ui/layout/Row'
import {DownloadQRCodeRoute} from 'modules/download-qr/types'

const DownloadQrHome = () => (
  <Row gutter="md">
    <NavigationButton
      flex
      label="Download link QR code maker"
      route={DownloadQRCodeRoute.downloadQRCode}
    />
  </Row>
)

export default DownloadQrHome
