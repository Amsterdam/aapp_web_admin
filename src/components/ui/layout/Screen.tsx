import {ReactNode, useEffect, useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import LogoutButton from 'authentication/components/LogoutButton'
import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import ErrorComponent from 'components/ui//Error'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'
import Logo from 'components/ui/media/Logo'
import 'components/ui/layout/Screen.css'
import type {AzureGroup} from 'authentication/types'

type Props = {
  children: ReactNode
  /** No authentication is required when set to false. */
  withLogin?: boolean
}

const errorMessageNotAuthorized =
  'Je hebt geen rechten om deze pagina te bekijken.'

const ErrorUnauthorized = () => {
  return <ErrorComponent message={errorMessageNotAuthorized} withHomeButton />
}

const Screen = ({children, withLogin = true}: Props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(
    undefined,
  )
  const azureGroups = useLoaderData() as AzureGroup[]
  const authorizedGroups = useGetAuthorizedGroups()

  useEffect(() => {
    if (!withLogin) {
      setIsAuthorized(true)

      return
    }
    setIsAuthorized(
      azureGroups?.some(group => authorizedGroups.includes(group)),
    )
  }, [azureGroups, authorizedGroups, withLogin])

  if (isAuthorized === undefined) {
    return null
  }

  return (
    <div className="Screen">
      <div className="Container">
        <Column gutter="xl">
          <header>
            <Row align="between" valign="start">
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
