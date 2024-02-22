import {
  ModuleWithStatusInRelease,
  ModuleVersion,
  ModuleInRelease,
  ModuleVersionWithStatus,
} from 'types/module'

export type ReleaseBase = {
  deprecated: string | null
  published: string | null
  releaseNotes: string
  unpublished: string | null
  version: string
}

export type Release = {
  created: string
  modified: string
  isSupported: boolean
  isDeprecated: boolean
} & ReleaseBase

export type ReleaseBaseWithModulesWithStatusInRelease = ReleaseBase & {
  modules: ModuleWithStatusInRelease[]
}

export type ReleaseBaseWithModulesInRelease = ReleaseBase & {
  modules: ModuleInRelease[]
}

export type ReleaseWithModuleVersions = Release & {
  modules: ModuleVersion[]
}

export type ReleaseWithModuleVersionsWithStatus = Release & {
  modules: ModuleVersionWithStatus[]
}
