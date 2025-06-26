import {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import useGetAuthorizedRoles from 'authentication/hooks/useGetAuthorizedRoles'
import {AzureRole} from 'authentication/types'

const useIsAuthorized = (requireLogin: boolean) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>()
  const AzureRoles = useLoaderData() as AzureRole[]
  const authorizedRoles = useGetAuthorizedRoles()
  useEffect(() => {
    if (!requireLogin) {
      setIsAuthorized(true)

      return
    }
    setIsAuthorized(
      AzureRoles?.some(role => authorizedRoles.includes(role)),
    )
  }, [AzureRoles, authorizedRoles, requireLogin])

  return isAuthorized
}

export default useIsAuthorized
