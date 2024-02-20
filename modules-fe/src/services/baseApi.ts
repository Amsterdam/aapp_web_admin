import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {msalInstance} from 'components/authentication/Init'
import {currentClientId} from 'utils/environment'

const authorizedEndpoints = [
  'createModule',
  'createRelease',
  'createModuleVersion',
  'deleteModuleVersion',
  'editModule',
  'editModuleVersion',
  'editModuleVersionStatus',
  'editReleaseVersion',
]

const baseQuery = fetchBaseQuery({
  baseUrl: '/modules',
  prepareHeaders: async (headers, {getState, endpoint}) => {
    const {accessToken} = await msalInstance.acquireTokenSilent({
      scopes: [`api://${currentClientId}/Modules.Edit`],
    })
    if (authorizedEndpoints.includes(endpoint)) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
