import {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import {AzureGroup} from 'authentication/types'

const useIsAuthorized = (requireLogin: boolean) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>()
  const azureGroups = useLoaderData() as AzureGroup[]
  const authorizedGroups = useGetAuthorizedGroups()
  useEffect(() => {
    if (!requireLogin) {
      setIsAuthorized(true)

      return
    }
    setIsAuthorized(
      azureGroups?.some(group => authorizedGroups.includes(group)),
    )
  }, [azureGroups, authorizedGroups, requireLogin])

  return isAuthorized
}

export default useIsAuthorized
