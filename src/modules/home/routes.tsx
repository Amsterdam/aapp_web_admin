import {RouteObject} from 'react-router-dom'
import ErrorScreen from 'components/ui/screens/Error.screen'
import HomeScreen from 'modules/home/screens/Home.screen'
import {homeModule} from '.'

export enum HomeRoute {
  home = '/',
}
const loader = () => homeModule.allowedAzureGroups

export const routes: RouteObject[] = [
  {
    loader,
    path: HomeRoute.home,
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
]
