import {baseApi} from 'services/baseApi'

type ProjectWarningImageQueryArg = {
  warning_id: 0
  image: {
    description: string
    data: string
  }
}

export const constructionWorkApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    PostProjectWarningImage: builder.mutation<
      void,
      ProjectWarningImageQueryArg
    >({
      query: body => ({
        url: `/construction-work/api/v1/project/warning/image`,
        method: 'POST',
        body: {main: true, ...body},
      }),
    }),
  }),
  overrideExisting: true,
})

export const {usePostProjectWarningImageMutation} = constructionWorkApi
