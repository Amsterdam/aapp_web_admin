import {ConstructionWorkEndpointName} from 'modules/construction-work-editor/types/api'
import {
  Publisher,
  PublisherQueryArgs,
  PublisherProjectsQueryArgs,
} from 'modules/construction-work-editor/types/publisher'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

export const publishersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ConstructionWorkEndpointName.addPublisher]: builder.mutation<
      Publisher,
      PublisherQueryArgs
    >({
      query: body => ({
        body,
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: '/projects/manager', // TODO change endpoint once ready
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
        url: '/projects/manager', // TODO change endpoint once ready
      }),
    }),
    [ConstructionWorkEndpointName.getPublisher]: builder.query<
      Publisher,
      PublisherQueryArgs
    >({
      query: params => ({
        directory: ApiDirectory.constructionWork,
        params,
        url: '/projects/manager', // TODO change endpoint once ready
      }),
    }),
    [ConstructionWorkEndpointName.getPublishers]: builder.query<
      Publisher[],
      void
    >({
      query: () => ({
        directory: ApiDirectory.constructionWork,
        url: '/publishers', // TODO change endpoint once ready
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
        url: '/projects/manager', // TODO change endpoint once ready
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
