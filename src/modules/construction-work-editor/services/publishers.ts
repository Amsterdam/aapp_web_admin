import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  Publisher,
  AddPublisherQueryArgs,
  PublisherProjectsQueryArgs,
} from 'modules/construction-work-editor/types/publisher'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const publishersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEndpointName.addPublisher]: builder.mutation<
      Publisher,
      AddPublisherQueryArgs
    >({
      invalidatesTags: ['Publishers'],
      query: body => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: '/manage/publishers',
      }),
    }),
    [ConstructionWorkEndpointName.addProjectsForPublisher]: builder.mutation<
      Publisher,
      PublisherProjectsQueryArgs
    >({
      invalidatesTags: (_result, _error, args) => [
        {type: 'Projects', id: args.projectId},
        {type: 'Publishers', id: args.id},
      ],
      query: ({id, projectId}) => ({
        body: {project_id: projectId},
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/manage/publishers/${id}/projects`,
      }),
    }),
    [ConstructionWorkEndpointName.getPublisher]: builder.query<
      Publisher,
      Publisher['id']
    >({
      providesTags: (_result, _error, id) => [{type: 'Publishers', id}],
      query: id => ({
        directory: ApiDirectory.constructionWork,
        url: `/manage/publishers/${id}`,
      }),
    }),
    [ConstructionWorkEndpointName.getPublishers]: builder.query<
      Publisher[],
      void
    >({
      providesTags: ['Publishers'],
      query: () => ({
        directory: ApiDirectory.constructionWork,
        url: '/manage/publishers',
      }),
    }),
    [ConstructionWorkEndpointName.removeProjectsForPublisher]: builder.mutation<
      Publisher,
      PublisherProjectsQueryArgs
    >({
      invalidatesTags: (_result, _error, args) => [
        {type: 'Projects', id: args.projectId},
        {type: 'Publishers', id: args.id},
      ],
      query: ({id, projectId}) => ({
        method: 'DELETE',
        directory: ApiDirectory.constructionWork,
        url: `/manage/publishers/${id}/projects/${projectId}`,
      }),
    }),
  }),
})

export const {
  useAddPublisherMutation,
  useAddProjectsForPublisherMutation,
  useGetPublisherQuery,
  useGetPublishersQuery,
  useRemoveProjectsForPublisherMutation,
} = publishersApi
