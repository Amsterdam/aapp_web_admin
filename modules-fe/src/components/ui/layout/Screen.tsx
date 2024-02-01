import {ReactNode, Fragment, useMemo} from 'react'
import {LoginBoundary} from 'components/authentication/LoginBoundary'
import LogoutButton from 'components/features/LogoutButton'
import Column from 'components/ui/layout/Column'
import Logo from 'components/ui/media/Logo'
import './Screen.css'
import Row from './Row'

type Props = {
  children: ReactNode
  noLogin?: boolean
}

const Screen = ({children, noLogin = false}: Props) => {
  const Container = useMemo(
    () => (noLogin ? Fragment : LoginBoundary),
    [noLogin],
  )
  return (
    <Container>
      <div className="Screen">
        <div className="Container">
          <Column gutter="xl">
            <header>
              <Row align="between" valign="start">
                <Logo />
                <LogoutButton />
              </Row>
            </header>
            <main>{children}</main>
          </Column>
        </div>
      </div>
    </Container>
  )
}

export default Screen
