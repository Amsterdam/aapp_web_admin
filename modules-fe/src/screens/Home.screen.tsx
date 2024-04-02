import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Screen from 'components/ui/layout/Screen'
import Table from 'components/ui/table/Table'
import Phrase from 'components/ui/text/Phrase'
import ScreenTitle from 'components/ui/text/ScreenTitle'

const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Amsterdam App" title="Modulebeheersysteem" />
        <Phrase>Wat wil je beheren?</Phrase>
        <Row gutter="md">
          <Button
            flex
            label="Modules"
            onClick={() => navigate('/mbs/modules')}
          />
          <Button
            flex
            label="Releases"
            onClick={() => navigate('/mbs/releases')}
          />
        </Row>
        <Phrase>Andere mogelijkheden</Phrase>
        <Row gutter="md">
          <Button
            flex
            label="Download link QR code maker"
            onClick={() => navigate('/mbs/download-qr-code')}
          />
        </Row>
        <Phrase>Andere</Phrase>
        <Row gutter="md">
          <Table />
        </Row>
      </Column>
    </Screen>
  )
}

export default HomeScreen
