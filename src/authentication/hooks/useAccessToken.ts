import {useMsal} from '@azure/msal-react'
import {useState, useEffect} from 'react'
import {currentClientId} from '@/utils/environment'

export const useAccessToken = () => {
  const {accounts, instance} = useMsal()
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: [`api://${currentClientId}/Modules.Edit`],
        account: accounts[0],
      })
      .then(({accessToken: newAccessToken}) => {
        setAccessToken(newAccessToken)
      })
  }, [accounts, instance])

  return accessToken
}
