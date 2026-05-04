import {RouteObject} from 'react-router-dom'
import ErrorScreen from '@/components/ui/screens/Error.screen'
import {homeModule} from '@/modules/home'
import HomeScreen from '@/modules/home/screens/Home.screen'
import {HomeRoute} from '@/modules/home/types'

const loader = () => homeModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: HomeRoute.home,
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
]
