import {useCallback} from 'react'
import useGetAuthorizedGroups from 'authentication/hooks/useGetAuthorizedGroups'
import modules from 'modules'

/**
 * Returns the modules that the user is authorized to see.
 */
const useAuthorizedModules = () => {
  const authorizedGroups = useGetAuthorizedGroups()

  const getAuthorizedModules = useCallback(
    () =>
      modules.filter(module =>
        module.allowedAzureGroups?.some(group =>
          authorizedGroups.includes(group),
        ),
      ),
    [authorizedGroups],
  )
  return getAuthorizedModules()
}

export default useAuthorizedModules
