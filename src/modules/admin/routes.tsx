import {RouteObject} from 'react-router-dom'
import ReleaseAdminScreen from './screens/ReleaseAdmin.screen'
import {ReleaseRoute} from './types'
import {adminModule} from '.'

const loader = () => adminModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: ReleaseRoute.admin,
    element: <ReleaseAdminScreen />,
  },
]
