import {useEffect, useState} from 'react'
import {useAccessToken} from 'authentication/hooks/useAccessToken'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`
}

const CityPassAdminScreen = () => {
  const accessToken = useAccessToken()
  const [didSetCookie, setDidSetCookie] = useState(false)
  useEffect(() => {
    if (accessToken) {
      setCookie('__Host-Access-Token', accessToken, 1)
      setDidSetCookie(true)
    }
  }, [accessToken])

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="CityPass" />
        {!!didSetCookie && (
          <iframe
            src="/city-pass/admin"
            width="100%"
            height="800px"
            title="CityPass admin"
          />
        )}
      </Column>
    </Screen>
  )
}

export default CityPassAdminScreen
