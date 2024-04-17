import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  ArticlesItem,
  ArticlesQueryArgs,
} from 'modules/construction-work-editor/types/article'
import {
  Publisher,
  PublisherProjectsQueryArgs,
  PublisherQueryArgs,
} from 'modules/construction-work-editor/types/publisher'
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
    [ConstructionWorkEndpointName.addPublisher]: builder.mutation<
      Publisher,
      PublisherQueryArgs
    >({
      query: body => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/projects/manager`,
      }),
    }),
    [ConstructionWorkEndpointName.addProjectsForPublisher]: builder.mutation<
      Publisher,
      PublisherProjectsQueryArgs
    >({
      query: body => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/projects/manager`,
      }),
    }),
    [ConstructionWorkEndpointName.getArticles]: builder.query<
      ArticlesItem[],
      ArticlesQueryArgs
    >({
      providesTags: ['Articles'],
      query: params => ({
        directory: ApiDirectory.constructionWork,
        url: '/articles',
        params,
      }),
    }),
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
    [ConstructionWorkEndpointName.getPublisher]: builder.query<
      Publisher,
      PublisherQueryArgs
    >({
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/projects/manager',
      }),
    }),

    [ConstructionWorkEndpointName.removeProjectsForPublisher]: builder.mutation<
      Publisher,
      PublisherProjectsQueryArgs
    >({
      query: body => ({
        body,
        method: 'DELETE',
        directory: ApiDirectory.constructionWork,
        url: `/projects/manager`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useAddPublisherMutation,
  useGetArticlesQuery,
  useGetProjectQuery,
  useGetProjectsQuery,
  useGetPublisherQuery,
  useRemoveProjectsForPublisherMutation,
} = projectsApi
