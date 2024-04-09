import {
  Module,
  ModuleVersion,
  ModuleVersionWithStatusInReleases,
  ModuleWithVersions,
} from 'modules/releases/types/module'
import {baseApi} from 'services/baseApi'
import {ApiDirectory} from 'services/types'

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
      invalidatesTags: ['Module'],
      query: module => ({
        body: {...module},
        method: 'POST',
        directory: ApiDirectory.modules,
        url: `/module`,
      }),
    }),
    createModuleVersion: builder.mutation<ModuleVersion, ModuleVersion>({
      invalidatesTags: ['Module'],
      query: module => ({
        body: {...module},
        method: 'POST',
        directory: ApiDirectory.modules,
        url: `/module/${module.moduleSlug}/version`,
      }),
      transformResponse: (response: {result: ModuleVersion}) => response.result,
    }),
    deleteModuleVersion: builder.mutation<
      ModuleVersion,
      Pick<ModuleVersion, 'moduleSlug' | 'version'>
    >({
      invalidatesTags: ['Module'],
      query: ({moduleSlug, version}) => ({
        method: 'DELETE',
        directory: ApiDirectory.modules,
        url: `/module/${moduleSlug}/version/${version}`,
      }),
    }),
    editModule: builder.mutation<Module, Module>({
      invalidatesTags: ['Module'],
      query: ({slug, status}) => ({
        body: {status},
        method: 'PATCH',
        url: `/module/${slug}`,
        directory: ApiDirectory.modules,
      }),
    }),
    editModuleVersion: builder.mutation<
      ModuleVersion,
      Partial<ModuleVersion> & {pathVersion: string}
    >({
      invalidatesTags: ['Module'],
      query: ({moduleSlug, pathVersion, ...rest}) => ({
        body: {...rest},
        method: 'PATCH',
        directory: ApiDirectory.modules,
        url: `/module/${moduleSlug}/version/${pathVersion}`,
      }),
    }),
    editModuleVersionStatus: builder.mutation<
      ModuleVersion,
      Pick<ModuleVersionWithStatusInReleases, 'statusInReleases'> & {
        slug: string
        version: string
      }
    >({
      invalidatesTags: ['Module', 'Release'],
      query: ({slug, version, statusInReleases}) => ({
        body: statusInReleases,
        method: 'PATCH',
        directory: ApiDirectory.modules,
        url: `/module/${slug}/version/${version}/status`,
      }),
    }),
    getModule: builder.query<ModuleWithVersions, ModuleQueryArg>({
      providesTags: ['Module'],
      query: ({slug}) => ({
        directory: ApiDirectory.modules,
        url: `/module/${slug}`,
      }),
    }),
    getModuleVersion: builder.query<
      ModuleVersionWithStatusInReleases,
      ModuleVersionQueryArg
    >({
      providesTags: ['Module'],
      query: ({slug, version}) => ({
        directory: ApiDirectory.modules,
        url: `/module/${slug}/version/${version}`,
      }),
    }),
    getModules: builder.query<ModuleVersion[], void>({
      providesTags: ['Module'],
      query: () => ({
        directory: ApiDirectory.modules,
        url: `/modules/latest`,
      }),
    }),
    getModulesAvailableForRelease: builder.query<ModuleVersion[], string>({
      providesTags: ['Module'],
      query: releaseVersion => ({
        directory: ApiDirectory.modules,
        url: `/modules/available-for-release/${releaseVersion}`,
      }),
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
