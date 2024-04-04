import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {msalInstance} from 'components/authentication/Init'
import {currentClientId} from 'modules/releases/utils/environment'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: async headers => {
    const {accessToken} = await msalInstance.acquireTokenSilent({
      scopes: [`api://${currentClientId}/Modules.Edit`],
    })
    headers.set('Authorization', `Bearer ${accessToken}`)

    return headers
  },
})

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
