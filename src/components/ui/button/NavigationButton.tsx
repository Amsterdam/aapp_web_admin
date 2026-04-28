import Button from 'components/ui/button/Button'
import useNavigate from 'hooks/useNavigate'
import {ExtractParams} from 'utils/getUrl'
import type {ButtonProps} from 'components/ui/button/Button'

type Props<T> = Omit<ButtonProps, 'onClick'> & {
  url: string
  params?: ExtractParams<T>
}

const NavigationButton = <T,>({url, params, ...buttonProps}: Props<T>) => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate(url, params)}
      {...buttonProps}
    />
  )
}

export default NavigationButton
