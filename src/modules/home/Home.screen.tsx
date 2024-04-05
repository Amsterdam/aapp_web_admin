import {useNavigate} from 'react-router-dom'
import {AuthProtectedScreen} from 'components/authentication/AuthProtected.screen'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {DownloadQRCodeRoute} from 'modules/download-qr/routes'
import {ReleasesRoute} from 'modules/releases/routes'

const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <AuthProtectedScreen>
      <Column gutter="lg">
        <ScreenTitle title="Amsterdam App" />
        <Phrase>Wat wil je beheren?</Phrase>
        <Row gutter="md">
          <Button
            flex
            label="Modules"
            onClick={() => navigate(ReleasesRoute.modules)}
          />
          <Button
            flex
            label="Releases"
            onClick={() => navigate(ReleasesRoute.releases)}
          />
        </Row>
        <Phrase>Andere mogelijkheden</Phrase>
        <Row gutter="md">
          <Button
            flex
            label="Download link QR code maker"
            onClick={() => navigate(DownloadQRCodeRoute.downloadQRCode)}
          />
        </Row>
      </Column>
    </AuthProtectedScreen>
  )
}

export default HomeScreen
