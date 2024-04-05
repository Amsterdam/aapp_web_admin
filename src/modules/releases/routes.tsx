import {RouteObject} from 'react-router-dom'
import CreateHotfixReleaseScreen from 'modules/releases/screens/CreateHotfixRelease.screen'
import CreateModuleScreen from 'modules/releases/screens/CreateModule.screen'
import CreateReleaseScreen from 'modules/releases/screens/CreateRelease.screen'
import EditModuleVersionScreen from 'modules/releases/screens/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'modules/releases/screens/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'modules/releases/screens/EditRelease.screen'
import ModuleScreen from 'modules/releases/screens/Module.screen'
import ModulesScreen from 'modules/releases/screens/Modules.screen'
import ReleasesScreen from 'modules/releases/screens/Releases.screen'

export enum ReleasesRoute {
  modules = '/modules',
  createModule = '/module/create',
  module = '/modules:slug',
  createModuleVersion = '/module/:slug/create',
  editModuleVersion = '/module/:slug/:version',
  editModuleVersionStatus = '/module/:slug/:version/status',
  releases = '/releases',
  createRelease = '/release/create',
  createHotfixRelease = '/release/hotfix/:version',
  editRelease = '/release/:version',
}

export const routes: RouteObject[] = [
  {
    path: ReleasesRoute.modules,
    element: <ModulesScreen />,
  },
  {
    path: ReleasesRoute.createModule,
    element: <CreateModuleScreen />,
  },
  {
    path: ReleasesRoute.module,
    element: <ModuleScreen />,
  },
  {
    path: ReleasesRoute.createModuleVersion,
    element: <CreateModuleScreen />,
  },
  {
    path: ReleasesRoute.editModuleVersion,
    element: <EditModuleVersionScreen />,
  },
  {
    path: ReleasesRoute.editModuleVersionStatus,
    element: <EditModuleVersionStatusScreen />,
  },
  {
    path: ReleasesRoute.releases,
    element: <ReleasesScreen />,
  },
  {
    path: ReleasesRoute.createRelease,
    element: <CreateReleaseScreen />,
  },
  {
    path: ReleasesRoute.createHotfixRelease,
    element: <CreateHotfixReleaseScreen />,
  },
  {
    path: ReleasesRoute.editRelease,
    element: <EditReleaseScreen />,
  },
]
