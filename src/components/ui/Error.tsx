import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import {HomeRoute} from 'modules/home/types'
import NavigationButton from './button/NavigationButton'

type Props = {
  message: string
  withHomeButton?: boolean
}

const ErrorComponent = ({message, withHomeButton}: Props) => (
  <Column>
    <Phrase emphasis="strong">Fout</Phrase>
    <Phrase>{message}</Phrase>
    {withHomeButton === true && (
      <NavigationButton
        label="Ga naar home"
        url={HomeRoute.home}
      />
    )}
  </Column>
)

export default ErrorComponent
