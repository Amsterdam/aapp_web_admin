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

export const routes: RouteObject[] = [
  {
    path: '/modules',
    element: <ModulesScreen />,
  },
  {
    path: '/module/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/module/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/module/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/module/:slug/:version',
    element: <EditModuleVersionScreen />,
  },
  {
    path: '/module/:slug/:version/status',
    element: <EditModuleVersionStatusScreen />,
  },
  {
    path: '/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/release/create',
    element: <CreateReleaseScreen />,
  },
  {
    path: '/release/hotfix/:version',
    element: <CreateHotfixReleaseScreen />,
  },
  {
    path: '/release/:version',
    element: <EditReleaseScreen />,
  },
]
