import {
  ManagerEndpoints,
  ManagersResponse,
} from 'modules/construction-work-editor/types/manager'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const managersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ManagerEndpoints.createManager]: builder.mutation<
      ManagersResponse,
      ManagersResponse
    >({
      invalidatesTags: [],
      query: manager => ({
        body: {...manager},
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/projects/manager`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useCreateManagerMutation} = managersApi
