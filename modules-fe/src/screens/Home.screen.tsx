import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'

const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Amsterdam App" />
        <Row gutter="md">
          <Button
            flex
            label="MBS"
            onClick={() => navigate('/mbs')}
          />
          <Button
            flex
            label="PBS"
            onClick={() => navigate('/pbs')}
          />
        </Row>
      </Column>
    </Screen>
  )
}

export default HomeScreen
