import {useMemo} from 'react'
import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import modules from 'modules'

/**
 * Returns the modules that the user is authorized to see.
 */
const useAuthorizedModules = () => {
  const authorizedGroups = useGetAuthorizedGroups()

  return useMemo(
    () =>
      modules.filter(module =>
        module.allowedAzureGroups?.some(group =>
          authorizedGroups.includes(group),
        ),
      ),
    [authorizedGroups],
  )
}

export default useAuthorizedModules
