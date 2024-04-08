import {baseApi} from 'services/baseApi'
import {
  Module,
  ModuleVersion,
  ModuleVersionWithStatusInReleases,
  ModuleWithVersions,
} from 'types/module'

type ModuleQueryArg = {
  slug: string
}

type ModuleVersionQueryArg = {
  slug: string
  version: string
}

export const modulesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createModule: builder.mutation<Module, Module>({
      query: module => ({
        url: `/modules/api/v1/module`,
        method: 'POST',
        body: {...module},
      }),
      invalidatesTags: ['Module'],
    }),
    createModuleVersion: builder.mutation<ModuleVersion, ModuleVersion>({
      query: module => ({
        url: `/modules/api/v1/module/${module.moduleSlug}/version`,
        method: 'POST',
        body: {...module},
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
      invalidatesTags: ['Module'],
    }),
    deleteModuleVersion: builder.mutation<
      ModuleVersion,
      Pick<ModuleVersion, 'moduleSlug' | 'version'>
    >({
      query: ({moduleSlug, version}) => ({
        url: `/modules/api/v1/module/${moduleSlug}/version/${version}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Module'],
    }),
    editModule: builder.mutation<Module, Module>({
      query: ({slug, status}) => ({
        url: `/modules/api/v1/module/${slug}`,
        method: 'PATCH',
        body: {status},
      }),
      invalidatesTags: ['Module'],
    }),
    editModuleVersion: builder.mutation<
      ModuleVersion,
      Partial<ModuleVersion> & {pathVersion: string}
    >({
      query: ({moduleSlug, pathVersion, ...rest}) => ({
        url: `/modules/api/v1/module/${moduleSlug}/version/${pathVersion}`,
        method: 'PATCH',
        body: {...rest},
      }),
      invalidatesTags: ['Module'],
    }),
    editModuleVersionStatus: builder.mutation<
      ModuleVersion,
      Pick<ModuleVersionWithStatusInReleases, 'statusInReleases'> & {
        slug: string
        version: string
      }
    >({
      query: ({slug, version, statusInReleases}) => ({
        url: `/modules/api/v1/module/${slug}/version/${version}/status`,
        method: 'PATCH',
        body: statusInReleases,
      }),
      invalidatesTags: ['Module', 'Release'],
    }),
    getModule: builder.query<ModuleWithVersions, ModuleQueryArg>({
      query: ({slug}) => `/modules/api/v1/module/${slug}`,
      providesTags: ['Module'],
    }),
    getModuleVersion: builder.query<
      ModuleVersionWithStatusInReleases,
      ModuleVersionQueryArg
    >({
      query: ({slug, version}) =>
        `/modules/api/v1/module/${slug}/version/${version}`,
      providesTags: ['Module'],
    }),
    getModules: builder.query<ModuleVersion[], void>({
      query: () => `/modules/api/v1/modules/latest`,
      providesTags: ['Module'],
    }),
    getModulesAvailableForRelease: builder.query<ModuleVersion[], string>({
      query: releaseVersion =>
        `/modules/api/v1/modules/available-for-release/${releaseVersion}`,
      providesTags: ['Module'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useCreateModuleMutation,
  useCreateModuleVersionMutation,
  useDeleteModuleVersionMutation,
  useEditModuleMutation,
  useEditModuleVersionMutation,
  useEditModuleVersionStatusMutation,
  useGetModuleQuery,
  useGetModuleVersionQuery,
  useGetModulesQuery,
  useGetModulesAvailableForReleaseQuery,
} = modulesApi
