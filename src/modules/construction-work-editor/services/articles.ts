import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  AddProjectWarningQueryArgs,
  ArticleWarning,
  AddProjectWarningResponse,
  EditProjectWarningQueryArgs,
} from 'modules/construction-work-editor/types/article'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEndpointName.getProjectWarning]: builder.query<
      ArticleWarning,
      number
    >({
      query: id => ({
        directory: ApiDirectory.constructionWork,
        url: `/manage/warnings/${id}`,
      }),
    }),
    [ConstructionWorkEndpointName.addProjectWarning]: builder.mutation<
      AddProjectWarningResponse,
      AddProjectWarningQueryArgs
    >({
      query: ({projectId, ...body}) => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/manage/projects/${projectId}/warnings`,
      }),
    }),
    [ConstructionWorkEndpointName.editProjectWarning]: builder.mutation<
      AddProjectWarningResponse,
      EditProjectWarningQueryArgs
    >({
      query: ({id, ...body}) => ({
        body,
        method: 'PATCH',
        directory: ApiDirectory.constructionWork,
        url: `/manage/warnings/${id}`,
      }),
    }),
    [ConstructionWorkEndpointName.deleteProjectWarning]: builder.mutation<
      string,
      number
    >({
      query: id => ({
        method: 'DELETE',
        directory: ApiDirectory.constructionWork,
        url: `/manage/warnings/${id}`,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetProjectWarningQuery,
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
  useRemoveProjectWarningMutation,
} = articlesApi
