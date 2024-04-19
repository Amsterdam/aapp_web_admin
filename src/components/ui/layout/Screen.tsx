import {ReactNode} from 'react'
import {LoginBoundary} from 'authentication/components/LoginBoundary'
import LogoutButton from 'authentication/components/LogoutButton'
import Column from 'components/ui/layout/Column'
import Logo from 'components/ui/media/Logo'
import './Screen.css'
import Row from './Row'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => (
  <LoginBoundary>
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
  </LoginBoundary>
)

export default Screen
