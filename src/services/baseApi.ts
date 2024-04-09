import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {msalInstance} from 'components/authentication/Auth.provider'
import {currentClientId} from 'utils/environment'
import {ApiDomain} from './types'

const baseQuery: BaseQueryFn<
  FetchArgs & {domain: ApiDomain},
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  fetchBaseQuery({
    baseUrl: `${window.location.origin}${args.domain}`,
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
