import {RouteObject} from 'react-router-dom'
import ProjectsScreen from './screens/Projects.screen'

export enum ConstructionWorkEditorRoute {
  projects = '/projecten',
}

export const routes: RouteObject[] = [
  {
    path: ConstructionWorkEditorRoute.projects,
    element: <ProjectsScreen />,
  },
]
