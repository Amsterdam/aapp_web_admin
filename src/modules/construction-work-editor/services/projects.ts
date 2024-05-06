import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'
import type {
  ProjectsResponse,
  ProjectsQueryArgs,
  Project,
  ProjectQueryArgs,
} from 'modules/construction-work-editor/types/project'

const DEFAULT_PROJECTS_PAGE_SIZE = 10000

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEndpointName.getProjects]: builder.query<
      ProjectsResponse,
      ProjectsQueryArgs | void
    >({
      providesTags: ['Projects'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params: {page_size: DEFAULT_PROJECTS_PAGE_SIZE, ...params},
        url: '/projects',
      }),
    }),
    [ConstructionWorkEndpointName.getProject]: builder.query<
      Project,
      ProjectQueryArgs
    >({
      providesTags: ['Projects'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/project/details',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetProjectQuery, useGetProjectsQuery} = projectsApi
