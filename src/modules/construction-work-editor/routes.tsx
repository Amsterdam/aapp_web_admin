import {RouteObject} from 'react-router-dom'
import ErrorScreen from 'components/ui/screens/Error.screen'
import HomeScreen from 'modules/home/Home.screen'

export enum ConstructionWorkEditorRoute {
  projects = '/projecten',
}

export const routes: RouteObject[] = [
  {
    path: ConstructionWorkEditorRoute.projects,
    element: <HomeScreen />,
    errorElement: <ErrorScreen message="Pagina niet gevonden (404)." />,
  },
]
