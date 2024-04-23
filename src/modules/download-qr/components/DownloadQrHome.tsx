import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Row from 'components/ui/layout/Row'
import {DownloadQRCodeRoute} from '../routes'

const DownloadQrHome = () => {
  const navigate = useNavigate()

  return (
    <Row gutter="md">
      <Button
        flex
        label="Download link QR code maker"
        onClick={() => navigate(DownloadQRCodeRoute.downloadQRCode)}
      />
    </Row>
  )
}

export default DownloadQrHome
