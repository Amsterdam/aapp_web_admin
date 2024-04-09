import {RouteObject} from 'react-router-dom'
import ErrorScreen from 'components/ui/screens/Error.screen'
import HomeScreen from 'modules/home/Home.screen'

export enum HomeRoute {
  home = '/',
}

export const routes: RouteObject[] = [
  {
    path: HomeRoute.home,
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
]
