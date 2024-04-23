import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'
import {HomeRoute} from 'modules/home/types'

type Props = {
  message: string
  withHomeButton?: boolean
}

const ErrorComponent = ({message, withHomeButton}: Props) => {
  const navigate = useNavigate()

  return (
    <Column>
      <Phrase emphasis="strong">Fout</Phrase>
      <Phrase>{message}</Phrase>
      {withHomeButton === true && (
        <Button label="Ga naar home" onClick={() => navigate(HomeRoute.home)} />
      )}
    </Column>
  )
}

export default ErrorComponent
