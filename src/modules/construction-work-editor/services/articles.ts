import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  AddProjectWarningQueryArgs,
  ArticleWarning,
  AddProjectWarningResponse,
  EditProjectWarningQueryArgs,
  AddProjectWarningImageQueryArgs,
  AddProjectWarningImageResponse,
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
      providesTags: ['Articles'],
    }),
    [ConstructionWorkEndpointName.addProjectWarningImage]: builder.mutation<
      AddProjectWarningImageResponse,
      AddProjectWarningImageQueryArgs
    >({
      query: formData => ({
        body: formData,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/warning-image`,
        headers: {
          Accept: 'application/json',
        },
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
      invalidatesTags: ['Articles'],
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
      invalidatesTags: ['Articles'],
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
      invalidatesTags: ['Articles'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetProjectWarningQuery,
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
  useEditProjectWarningMutation,
  useRemoveProjectWarningMutation,
} = articlesApi
