import {useMemo} from 'react'
import useGetAuthorizedRoles from '@/authentication/hooks/useGetAuthorizedRoles'
import modules from '@/modules'

/**
 * Returns the modules that the user is authorized to see.
 */
const useAuthorizedModules = () => {
  const authorizedRoles = useGetAuthorizedRoles()

  return useMemo(
    () =>
      modules.filter(module =>
        module.allowedAzureRoles?.some(role => authorizedRoles.includes(role)),
      ),
    [authorizedRoles],
  )
}

export default useAuthorizedModules
