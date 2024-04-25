export enum ReleasesRoute {
  modules = '/modules',
  createModule = '/module/create',
  module = '/module/:slug',
  createModuleVersion = '/module/:slug/create',
  editModuleVersion = '/module/:slug/:version',
  editModuleVersionStatus = '/module/:slug/:version/status',
  releases = '/releases',
  createRelease = '/release/create',
  createHotfixRelease = '/release/hotfix/:version',
  editRelease = '/release/:version',
}
