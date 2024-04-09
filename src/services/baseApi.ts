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

      return headers
    },
  })(args, baseQueryApi, extraOptions as never)

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Module', 'Release'],
})
