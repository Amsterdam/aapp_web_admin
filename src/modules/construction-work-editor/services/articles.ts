import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  AddProjectWarningQueryArgs,
  ArticleWarning,
  ArticlesItem,
  ArticlesQueryArgs,
  AddProjectWarningResponse,
  EditProjectWarningQueryArgs,
} from 'modules/construction-work-editor/types/article'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
    [ConstructionWorkEndpointName.getProjectWarning]: builder.query<
      ArticleWarning,
      {id: string}
    >({
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/project/warning',
      }),
    }),
    [ConstructionWorkEndpointName.addProjectWarning]: builder.mutation<
      AddProjectWarningResponse,
      AddProjectWarningQueryArgs
    >({
      query: body => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/project/warning`,
      }),
    }),
    [ConstructionWorkEndpointName.editProjectWarning]: builder.mutation<
      AddProjectWarningResponse,
      EditProjectWarningQueryArgs
    >({
      query: body => ({
        body,
        method: 'PATCH',
        directory: ApiDirectory.constructionWork,
        url: `/project/warning`,
      }),
    }),
    [ConstructionWorkEndpointName.deleteProjectWarning]: builder.mutation<
      string,
      {id: string}
    >({
      query: body => ({
        body,
        method: 'DELETE',
        directory: ApiDirectory.constructionWork,
        url: `/project/warning`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetArticlesQuery,
  useGetProjectWarningQuery,
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
  useRemoveProjectWarningMutation,
} = articlesApi
