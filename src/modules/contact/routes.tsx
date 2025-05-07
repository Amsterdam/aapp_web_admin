import {RouteObject} from 'react-router-dom'
import ContactAdminScreen from './screens/ContactAdmin.screen'
import {ContactRoute} from './types'
import {contactModule} from '.'

const loader = () => contactModule.allowedAzureGroups

export const routes: RouteObject[] = [
  {
    loader,
    path: ContactRoute.admin,
    element: <ContactAdminScreen />,
  },
]
