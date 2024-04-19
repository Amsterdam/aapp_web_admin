import ErrorComponent from 'components/ui/Error'
import Screen from 'components/ui/layout/Screen'

type Props = {
  message: string
}

const ErrorScreen = ({message}: Props) => (
  <Screen withLogin={false}>
    <ErrorComponent message={message} />
  </Screen>
)

export default ErrorScreen
