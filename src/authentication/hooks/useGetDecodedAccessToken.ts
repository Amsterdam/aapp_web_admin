import {useMsal} from '@azure/msal-react'
import {jwtDecode} from 'jwt-decode'
import {useState, useEffect} from 'react'
import {DecodedJWTToken} from 'authentication/types'
import {currentClientId} from 'utils/environment'

const useGetDecodedAccessToken = () => {
  const {accounts, instance} = useMsal()
  const [accessToken, setAccessToken] = useState('')
  const [decodedToken, setDecodedToken] = useState<DecodedJWTToken>()

  useEffect(() => {
    const fetchData = async () => {
      // Assuming you have a token in the cache
      const response = await instance.acquireTokenSilent({
        scopes: [`api://${currentClientId}/Modules.Edit`],
        account: accounts[0],
      })
      setAccessToken(response.accessToken)
    }

    fetchData()
  }, [accounts, instance])

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      setDecodedToken(decoded)
    }
  }, [accessToken])

  return decodedToken
}
export default useGetDecodedAccessToken
