import {useMsal} from '@azure/msal-react'
import {jwtDecode} from 'jwt-decode'
import {useEffect, useState} from 'react'
import {DecodedJWTToken} from '@/authentication/types'
import {currentClientId} from '@/utils/environment'

const useGetDecodedAccessToken = () => {
  const {accounts, instance} = useMsal()
  const [decodedAccessToken, setDecodedAccessToken] =
    useState<DecodedJWTToken>()

  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: [`api://${currentClientId}/Modules.Edit`],
        account: accounts[0],
      })
      .then(({accessToken}) => {
        setDecodedAccessToken(jwtDecode(accessToken))
      })
  }, [accounts, instance])

  return decodedAccessToken
}
export default useGetDecodedAccessToken
