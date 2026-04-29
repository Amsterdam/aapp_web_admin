import {useMemo} from 'react'
import {AzureRoles} from '@/authentication/constants'
import useGetDecodedAccessToken from '@/authentication/hooks/useGetDecodedAccessToken'
import {AzureRole} from '@/authentication/types'
import {environment} from '@/utils/environment'

const useGetAuthorizedRoles = () => {
  const decodedToken = useGetDecodedAccessToken()
  const {roles = []} = decodedToken ?? {roles: []}
  const AzureRoleNames = Object.keys(AzureRoles) as AzureRole[]

  return useMemo(
    () =>
      AzureRoleNames.filter(roleName =>
        roles.includes(AzureRoles[roleName][environment]),
      ),
    [AzureRoleNames, roles],
  )
}

export default useGetAuthorizedRoles
