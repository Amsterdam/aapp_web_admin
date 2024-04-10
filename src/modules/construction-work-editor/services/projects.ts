import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'
import type {
  ProjectsResponse,
  ProjectsQueryArgs,
} from 'modules/construction-work-editor/types/projects'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.projects]: builder.query<
      ProjectsResponse,
      ProjectsQueryArgs
    >({
      providesTags: ['Projects'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/projects',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useProjectsQuery} = projectsApi
