export enum ReleasesRoute {
  modules = '/releases/modules',
  createModule = '/releases/module/create',
  module = '/releases/module/:slug',
  createModuleVersion = '/releases/module/:slug/create',
  editModuleVersion = '/releases/module/:slug/:version',
  editModuleVersionStatus = '/releases/module/:slug/:version/status',
  releases = '/releases',
  createRelease = '/releases/create',
  createHotfixRelease = '/releases/hotfix/:version',
  editRelease = '/releases/:version',
}
