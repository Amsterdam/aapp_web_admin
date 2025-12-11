import {RouteObject} from 'react-router-dom'
import WasteAdminScreen from './screens/WasteAdmin.screen'
import {WasteRoute} from './types'
import {wasteModule} from '.'

const loader = () => wasteModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: WasteRoute.admin,
    element: <WasteAdminScreen />,
  },
]
