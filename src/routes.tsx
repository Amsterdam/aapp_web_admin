import {RouteObject} from 'react-router-dom'
import HomeScreen from 'modules/home/Home.screen'
import CreateHotfixReleaseScreen from 'modules/releases/screens/CreateHotfixRelease.screen'
import CreateModuleScreen from 'modules/releases/screens/CreateModule.screen'
import CreateReleaseScreen from 'modules/releases/screens/CreateRelease.screen'
import DownloadQRCodeScreen from 'modules/releases/screens/DownloadQRCode.Screen'
import EditModuleVersionScreen from 'modules/releases/screens/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'modules/releases/screens/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'modules/releases/screens/EditRelease.screen'
import ErrorScreen from 'modules/releases/screens/Error.screen'
import ModuleScreen from 'modules/releases/screens/Module.screen'
import ModulesScreen from 'modules/releases/screens/Modules.screen'
import ReleasesScreen from 'modules/releases/screens/Releases.screen'

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
    path: '/mbs/release/hotfix/:version',
    element: <CreateHotfixReleaseScreen />,
  },
  {
    path: '/mbs/release/:version',
    element: <EditReleaseScreen />,
  },
  {
    path: '/mbs/download-qr-code',
    element: <DownloadQRCodeScreen />,
  },
]
