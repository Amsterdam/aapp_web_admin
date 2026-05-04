import ErrorComponent from '@/components/ui/Error'
import Column from '@/components/ui/layout/Column'
import Screen from '@/components/ui/layout/Screen'

type Props = {
  message: string
  withHomeButton?: boolean
}

const ErrorScreen = ({message, withHomeButton}: Props) => (
  <Screen requireLogin={false}>
    <Column gutter="xl">
      <ErrorComponent
        message={message}
        withHomeButton={withHomeButton}
      />
    </Column>
  </Screen>
)

export default ErrorScreen
