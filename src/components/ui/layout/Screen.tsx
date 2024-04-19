import {Fragment, ReactNode} from 'react'
import {LoginBoundary} from 'authentication/components/LoginBoundary'
import LogoutButton from 'authentication/components/LogoutButton'
import Column from 'components/ui/layout/Column'
import Logo from 'components/ui/media/Logo'
import './Screen.css'
import Row from './Row'

type Props = {
  children: ReactNode
  withLogin?: boolean
}

const Screen = ({children, withLogin = true}: Props) => {
  const Container = withLogin ? LoginBoundary : Fragment
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
