import {useNavigate} from 'react-router-dom'
import ErrorComponent from 'components/ui/Error'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import {HomeRoute} from 'modules/home/types'

type Props = {
  message: string
  withHomeButton?: boolean
}

const ErrorScreen = ({message, withHomeButton}: Props) => {
  const navigate = useNavigate()

  return (
    <Screen withLogin={false}>
      <Column gutter="xl">
        <ErrorComponent message={message} />
        {withHomeButton === true && (
          <Button
            label="Ga naar home"
            onClick={() => navigate(HomeRoute.home)}
          />
        )}
      </Column>
    </Screen>
  )
}

export default ErrorScreen
