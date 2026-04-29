import {ReactNode} from 'react'
import LogoutButton from '@/authentication/components/LogoutButton'
import useIsAuthorized from '@/authentication/hooks/useIsAuthorized'
import ErrorComponent from '@/components/ui/Error'
import Column from '@/components/ui/layout/Column'
import Row from '@/components/ui/layout/Row'
import Logo from '@/components/ui/media/Logo'
import '@/components/ui/layout/Screen.css'

type Props = {
  children: ReactNode
  /** No authentication is required when set to false. */
  requireLogin?: boolean
}

const errorMessageNotAuthorized =
  'Je hebt geen rechten om deze pagina te bekijken.'

const ErrorUnauthorized = () => {
  return (
    <ErrorComponent
      message={errorMessageNotAuthorized}
      withHomeButton
    />
  )
}

const Screen = ({children, requireLogin = true}: Props) => {
  const isAuthorized = useIsAuthorized(requireLogin)

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="Screen">
      <div className="Container">
        <Column gutter="xl">
          <header>
            <Row
              align="between"
              valign="start">
              <Logo />
              <LogoutButton />
            </Row>
          </header>
          <main>{isAuthorized ? children : <ErrorUnauthorized />}</main>
        </Column>
      </div>
    </div>
  )
}

export default Screen
