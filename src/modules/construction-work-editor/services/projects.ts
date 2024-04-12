import {
  type ProjectsResponse,
  type ProjectsQueryArgs,
  ProjectsEndpointName,
} from 'modules/construction-work-editor/types/projects'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.getProjects]: builder.query<
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

export const {useGetProjectsQuery} = projectsApi
