/* eslint-disable no-console */
import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import ImageField from 'components/ui/forms/ImageField'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Screen from 'components/ui/layout/Screen'
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
      </Column>
      <Column>
        <ImageField
          alt="foo"
          caption="bar"
          src="https://www.amsterdam.nl/publish/pages/1049981/amsterdam_centraal.jpg"
          onAdd={a => console.log(a)}
          onDelete={() => console.log('')}
        />
      </Column>
    </Screen>
  )
}

export default HomeScreen
