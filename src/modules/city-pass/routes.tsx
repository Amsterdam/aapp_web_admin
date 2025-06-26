import {RouteObject} from 'react-router-dom'
import CityPassAdminScreen from './screens/CityPassAdmin.screen'
import {CityPassRoute} from './types'
import {cityPassModule} from '.'

const loader = () => cityPassModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: CityPassRoute.admin,
    element: <CityPassAdminScreen />,
  },
]
