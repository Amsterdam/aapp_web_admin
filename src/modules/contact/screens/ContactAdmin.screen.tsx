import {useEffect, useState} from 'react'
import {useAccessToken} from '@/authentication/hooks/useAccessToken'
import Iframe from '@/components/ui/Iframe'
import Column from '@/components/ui/layout/Column'
import Screen from '@/components/ui/layout/Screen'
import ScreenTitle from '@/components/ui/text/ScreenTitle'
import {setChunkedCookie} from '@/utils/setChunkedCookie'

const ContactAdminScreen = () => {
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
        <ScreenTitle title="Contact" />
        {!!didSetCookie && (
          <Iframe
            src="/contact/admin"
            title="Contact admin"
          />
        )}
      </Column>
    </Screen>
  )
}

export default ContactAdminScreen
