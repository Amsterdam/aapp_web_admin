import {useEffect, useState} from 'react'
import {useAccessToken} from 'authentication/hooks/useAccessToken'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'

/** max safe size per cookie (a bit below 4 kB) */
const CHUNK_SIZE = 3500

const setChunkedCookie = (name: string, value: string, days = 1) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  const secure =
    window.location.protocol === 'https:' ? ' Secure; SameSite=Strict;' : ''

  /* clear previous chunks */
  document.cookie
    .split('; ')
    .filter(c => c.startsWith(`${name}.`))
    .forEach(c => {
      const [k] = c.split('=')
      document.cookie = `${k}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`
    })

  /* write new chunks */
  for (let i = 0, idx = 0; i < value.length; i += CHUNK_SIZE, idx += 1) {
    const chunk = value.slice(i, i + CHUNK_SIZE) // keep raw, avoids length-inflation
    document.cookie = `${name}.${idx}=${chunk}; Expires=${expires}; Path=/;${secure}`
  }
  // eslint-disable-next-line no-console
  console.log('cookies after set →', document.cookie)
}

const CityPassAdminScreen = () => {
  const accessToken = useAccessToken()
  const [didSetCookie, setDidSetCookie] = useState(false)
  useEffect(() => {
    if (accessToken) {
      setChunkedCookie('__Host-Access-Token', accessToken) // handles any token size
      setDidSetCookie(true)
    }
  }, [accessToken])

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Stadspas" />
        {!!didSetCookie && (
          <iframe
            src="/city-pass/admin"
            width="100%"
            height="800px"
            title="Stadspas admin"
          />
        )}
      </Column>
    </Screen>
  )
}

export default CityPassAdminScreen
