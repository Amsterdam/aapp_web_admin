import {useMemo} from 'react'
import {azureGroups} from 'authentication/constants'
import useGetDecodedAccessToken from 'authentication/hooks/useGetDecodedAccessToken'
import {AzureGroup} from 'authentication/types'
import {environment} from 'utils/environment'

const useGetAuthorizedGroups = () => {
  const decodedToken = useGetDecodedAccessToken()
  const {groups = []} = decodedToken ?? {groups: []}
  const azureGroupNames = Object.keys(azureGroups) as AzureGroup[]

  return useMemo(
    () =>
      azureGroupNames.filter(groupName =>
        groups.includes(azureGroups[groupName][environment]),
      ),
    [azureGroupNames, groups],
  )
}

export default useGetAuthorizedGroups
