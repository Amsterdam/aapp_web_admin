import {
  ReleaseBase,
  ReleaseBaseWithModulesInRelease,
  ReleaseBaseWithModulesWithStatusInRelease,
  ReleaseWithModuleVersions,
  ReleaseWithModuleVersionsWithStatus,
} from 'modules/releases/types/release'
import {baseApi} from 'services/baseApi'
import {ApiDomain} from 'services/types'

type ReleaseQueryArg = {
  version: ReleaseBase['version']
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editReleaseVersion: builder.mutation<
      ReleaseWithModuleVersions,
      Partial<ReleaseBaseWithModulesInRelease> & {pathVersion: string}
    >({
      invalidatesTags: ['Module', 'Release'],
      query: ({pathVersion, ...release}) => ({
        body: {
          ...release,
        },
        domain: ApiDomain.modules,
        method: 'PATCH',
        url: `/release/${pathVersion}`,
      }),
    }),
    createRelease: builder.mutation<
      ReleaseWithModuleVersions,
      ReleaseBaseWithModulesWithStatusInRelease
    >({
      invalidatesTags: ['Module', 'Release'],
      query: ({published, unpublished, ...release}) => ({
        body: {
          published: published || null,
          unpublished: unpublished || null,
          ...release,
        },
        domain: ApiDomain.modules,
        method: 'POST',
        url: '/release',
      }),
    }),
    getLatestRelease: builder.query<ReleaseWithModuleVersions, void>({
      providesTags: ['Release'],
      query: () => ({domain: ApiDomain.modules, url: '/release/latest'}),
    }),
    getRelease: builder.query<
      ReleaseWithModuleVersionsWithStatus,
      ReleaseQueryArg
    >({
      providesTags: ['Release'],
      query: ({version}) => ({
        domain: ApiDomain.modules,
        url: `/release/${version}`,
      }),
    }),
    getReleases: builder.query<ReleaseWithModuleVersions[], void>({
      providesTags: ['Release'],
      query: () => ({domain: ApiDomain.modules, url: '/releases'}),
    }),
  }),
  overrideExisting: true,
})

export const {
  useEditReleaseVersionMutation,
  useGetReleaseQuery,
  useGetReleasesQuery,
  useGetLatestReleaseQuery,
  useCreateReleaseMutation,
} = modulesApi
