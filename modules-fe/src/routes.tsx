import {RouteObject} from 'react-router-dom'
import HomeScreen from 'screens/Home.screen'
import CreateHotfixReleaseScreen from 'screens/mbs/CreateHotfixRelease.screen'
import CreateModuleScreen from 'screens/mbs/CreateModule.screen'
import CreateReleaseScreen from 'screens/mbs/CreateRelease.screen'
import DownloadQRCodeScreen from 'screens/mbs/DownloadQRCode.Screen'
import EditModuleVersionScreen from 'screens/mbs/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'screens/mbs/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'screens/mbs/EditRelease.screen'
import ErrorScreen from 'screens/mbs/Error.screen'
import MbsHome from 'screens/mbs/MbsHome.screen'
import ModuleScreen from 'screens/mbs/Module.screen'
import ModulesScreen from 'screens/mbs/Modules.screen'
import ReleasesScreen from 'screens/mbs/Releases.screen'
import PbsHome from 'screens/pbs/PbsHome.screen'

export const routes: RouteObject[] = [
  {
    path: '/home',
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
  {
    path: '/mbs',
    element: <MbsHome />,
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
  {
    path: '/pbs',
    element: <PbsHome />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
]
