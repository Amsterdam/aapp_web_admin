import {RouteObject} from 'react-router-dom'
import CreateModuleScreen from 'screens/CreateModule.screen'
import CreateReleaseScreen from 'screens/CreateRelease.screen'
import EditModuleVersionScreen from 'screens/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'screens/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'screens/EditRelease.screen'
import ErrorScreen from 'screens/Error.screen'
import HomeScreen from 'screens/Home.screen'
import LoginScreen from 'screens/Login.screen'
import ModuleScreen from 'screens/Module.screen'
import ModulesScreen from 'screens/Modules.screen'
import ReleasesScreen from 'screens/Releases.screen'

export const routes: RouteObject[] = [
  {
    path: '/modules',
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
  {
    path: '/modules/login',
    element: <LoginScreen />,
  },
  {
    path: '/modules/modules',
    element: <ModulesScreen />,
  },
  {
    path: '/modules/module/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/modules/module/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/modules/module/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/modules/module/:slug/:version',
    element: <EditModuleVersionScreen />,
  },
  {
    path: '/modules/module/:slug/:version/status',
    element: <EditModuleVersionStatusScreen />,
  },
  {
    path: '/modules/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/modules/release/create',
    element: <CreateReleaseScreen />,
  },
  {
    path: '/modules/release/:version',
    element: <EditReleaseScreen />,
  },
]
