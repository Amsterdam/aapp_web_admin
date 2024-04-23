import {useCallback} from 'react'
import {azureGroups} from 'authentication/constants'
import useGetDecodedAccessToken from 'authentication/hooks/useGetDecodedAccessToken'
import {AzureGroup} from 'authentication/types'
import {environment} from 'utils/environment'

const useGetAuthorizedGroups = () => {
  const decodedToken = useGetDecodedAccessToken()
  const {groups = []} = decodedToken ?? {groups: []}

  const getAuthorizedGroups = useCallback(
    () =>
      groups.reduce((acc, group) => {
        if (group === azureGroups[AzureGroup.admin][environment]) {
          return [...acc, AzureGroup.admin]
        }
        if (group === azureGroups[AzureGroup.editor][environment]) {
          return [...acc, AzureGroup.editor]
        }
        if (group === azureGroups[AzureGroup.publisher][environment]) {
          return [...acc, AzureGroup.publisher]
        }

        return acc
      }, [] as AzureGroup[]),
    [groups],
  )

  return getAuthorizedGroups()
}

export default useGetAuthorizedGroups
