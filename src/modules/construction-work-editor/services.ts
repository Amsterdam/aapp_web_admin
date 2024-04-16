import {
  ArticlesItem,
  ArticlesQueryArgs,
} from 'modules/construction-work-editor/types/article'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'
import type {
  ProjectsResponse,
  ProjectsQueryArgs,
  Project,
  ProjectQueryArgs,
} from 'modules/construction-work-editor/types/project'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<ArticlesItem[], ArticlesQueryArgs>({
      providesTags: ['Articles'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        url: '/articles',
        params,
      }),
    }),
    getProjects: builder.query<ProjectsResponse, ProjectsQueryArgs>({
      providesTags: ['Projects'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/projects',
      }),
    }),
    getProject: builder.query<Project, ProjectQueryArgs>({
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

export const {useGetArticlesQuery, useGetProjectsQuery, useGetProjectQuery} =
  projectsApi
