import {InteractionType} from '@azure/msal-browser'
import {useMsal} from '@azure/msal-react'
import LoginBoundary from 'authentication/components/LoginBoundary'
import Button from 'components/ui/button/Button'
import Icon from 'components/ui/media/Icon'

const LogoutButton = () => {
  const {instance} = useMsal()

  return (
    <LoginBoundary interactionType={InteractionType.Silent}>
      <Button
        icon={<Icon name="logout" />}
        label="Uitloggen"
        onClick={() => instance.logout()}
        variant="tertiary"
      />
    </LoginBoundary>
  )
}

export default LogoutButton
