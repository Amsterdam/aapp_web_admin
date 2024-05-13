import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'
import type {
  Project,
  ProjectsItem,
} from 'modules/construction-work-editor/types/project'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEndpointName.getProjects]: builder.query<
      ProjectsItem[],
      void
    >({
      providesTags: ['Projects'],
      query: () => ({
        directory: ApiDirectory.constructionWork,
        url: '/manage/projects',
      }),
    }),
    [ConstructionWorkEndpointName.getProject]: builder.query<
      Project,
      {id: string}
    >({
      providesTags: ['Projects'],
      query: ({id}) => ({
        directory: ApiDirectory.constructionWork,
        url: `/manage/projects/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useGetProjectQuery, useGetProjectsQuery} = projectsApi
