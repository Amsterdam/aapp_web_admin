import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {msalInstance} from 'components/authentication/Auth.provider'
import {currentClientId} from 'utils/environment'
import {ApiDirectory} from './types'

const {REACT_APP_API_KEY: API_KEY} = process.env

const baseQuery: BaseQueryFn<
  FetchArgs & {directory: ApiDirectory},
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  fetchBaseQuery({
    baseUrl: args.directory,
    prepareHeaders: async headers => {
      const {accessToken} = await msalInstance.acquireTokenSilent({
        scopes: [`api://${currentClientId}/Modules.Edit`],
      })
      headers.set('Authorization', `Bearer ${accessToken}`)

      // TODO: Remove this once the new endpoint is available.
      if (API_KEY && args.directory === ApiDirectory.constructionWork) {
        headers.set('X-API-KEY', API_KEY)
        headers.set('deviceid', 'random-device-id')
      }
      return headers
    },
  })(args, baseQueryApi, extraOptions as never)

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Articles', 'Module', 'Projects', 'Release'],
})
