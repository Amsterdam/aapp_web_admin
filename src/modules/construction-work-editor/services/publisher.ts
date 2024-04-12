import {
  PublisherEndpointNames,
  PublisherMutationArgs,
  Publisher,
} from 'modules/construction-work-editor/types/publisher'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

// TODO: Doublecheck the endpoints when BE is done (Response and args are different i guess :D)
export const publisherApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [PublisherEndpointNames.addPublisher]: builder.mutation<
      Pick<Publisher, 'id'>,
      PublisherMutationArgs
    >({
      query: body => ({
        body: {...body},
        method: 'POST',
        directory: ApiDirectory.constructionWork,
        url: `/projects/manager`,
      }),
    }),
    [PublisherEndpointNames.getPublisher]: builder.query<
      Publisher,
      Pick<Publisher, 'id'>
    >({
      query: params => ({
        directory: ApiDirectory.constructionWork,
        method: 'GET',
        params,
        url: '/projects/manager',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {useAddPublisherMutation, useGetPublisherQuery} = publisherApi
