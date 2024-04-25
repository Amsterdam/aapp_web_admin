import {RouteObject} from 'react-router-dom'
import {releasesModule} from 'modules/releases'
import CreateHotfixReleaseScreen from 'modules/releases/screens/CreateHotfixRelease.screen'
import CreateModuleScreen from 'modules/releases/screens/CreateModule.screen'
import CreateReleaseScreen from 'modules/releases/screens/CreateRelease.screen'
import EditModuleVersionScreen from 'modules/releases/screens/EditModuleVersion.screen'
import EditModuleVersionStatusScreen from 'modules/releases/screens/EditModuleVersionStatus.screen'
import EditReleaseScreen from 'modules/releases/screens/EditRelease.screen'
import ModuleScreen from 'modules/releases/screens/Module.screen'
import ModulesScreen from 'modules/releases/screens/Modules.screen'
import ReleasesScreen from 'modules/releases/screens/Releases.screen'
import {ReleasesRoute} from 'modules/releases/types/routes'

const loader = () => releasesModule.allowedAzureGroups

export const routes: RouteObject[] = [
  {
    loader,
    path: ReleasesRoute.modules,
    element: <ModulesScreen />,
  },
  {
    loader,
    path: ReleasesRoute.createModule,
    element: <CreateModuleScreen />,
  },
  {
    loader,
    path: ReleasesRoute.module,
    element: <ModuleScreen />,
  },
  {
    loader,
    path: ReleasesRoute.createModuleVersion,
    element: <CreateModuleScreen />,
  },
  {
    loader,
    path: ReleasesRoute.editModuleVersion,
    element: <EditModuleVersionScreen />,
  },
  {
    loader,
    path: ReleasesRoute.editModuleVersionStatus,
    element: <EditModuleVersionStatusScreen />,
  },
  {
    loader,
    path: ReleasesRoute.releases,
    element: <ReleasesScreen />,
  },
  {
    loader,
    path: ReleasesRoute.createRelease,
    element: <CreateReleaseScreen />,
  },
  {
    loader,
    path: ReleasesRoute.createHotfixRelease,
    element: <CreateHotfixReleaseScreen />,
  },
  {
    loader,
    path: ReleasesRoute.editRelease,
    element: <EditReleaseScreen />,
  },
]
