import {RouteObject} from 'react-router-dom'
import CreateModuleScreen from 'screens/CreateModule.screen'
import CreateReleaseScreen from 'screens/CreateRelease.screen'
import EditModuleVersionScreen from 'screens/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'screens/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'screens/EditRelease.screen'
import ErrorScreen from 'screens/Error.screen'
import HomeScreen from 'screens/Home.screen'
import ModuleScreen from 'screens/Module.screen'
import ModulesScreen from 'screens/Modules.screen'
import ReleasesScreen from 'screens/Releases.screen'

export const routes: RouteObject[] = [
  {
    path: '/mbs',
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
  {
    path: '/mbs/modules',
    element: <ModulesScreen />,
  },
  {
    path: '/mbs/module/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/mbs/module/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/mbs/module/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/mbs/module/:slug/:version',
    element: <EditModuleVersionScreen />,
  },
  {
    path: '/mbs/module/:slug/:version/status',
    element: <EditModuleVersionStatusScreen />,
  },
  {
    path: '/mbs/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/mbs/release/create',
    element: <CreateReleaseScreen />,
  },
  {
    path: '/mbs/release/:version',
    element: <EditReleaseScreen />,
  },
]
