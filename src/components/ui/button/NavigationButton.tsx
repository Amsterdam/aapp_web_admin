import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import type {ButtonProps} from 'components/ui/button/Button'

type Props = Omit<ButtonProps, 'onClick'> & {
  route: string
}

const NavigationButton = ({route, ...buttonProps}: Props) => {
  const navigate = useNavigate()

  return <Button onClick={() => navigate(route)} {...buttonProps} />
}

export default NavigationButton
