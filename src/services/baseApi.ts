import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import {loginRequest} from '@/authentication/authConfig'
import {msalInstance} from '@/index'
import {ApiDirectory} from './types'

const baseQuery: BaseQueryFn<
  FetchArgs & {directory: ApiDirectory},
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  fetchBaseQuery({
    baseUrl: args.directory,
    prepareHeaders: async headers => {
      const activeAccount = msalInstance.getActiveAccount() // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
      const accounts = msalInstance.getAllAccounts()
      const {accessToken} = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: activeAccount || accounts[0],
      })
      headers.set('Authorization', `Bearer ${accessToken}`)

      return headers
    },
  })(args, baseQueryApi, extraOptions as never)

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Articles', 'Module', 'Projects', 'Publishers', 'Release'],
})
