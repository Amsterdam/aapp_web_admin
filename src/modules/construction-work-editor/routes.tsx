import {RouteObject} from 'react-router-dom'
import ProjectScreen from './screens/Project.screen'
import ProjectsScreen from './screens/Projects.screen'

export enum ConstructionWorkEditorRoute {
  project = '/project/:id',
  projects = '/projecten',
}

export const routes: RouteObject[] = [
  {
    path: ConstructionWorkEditorRoute.projects,
    element: <ProjectsScreen />,
  },
  {
    path: ConstructionWorkEditorRoute.project,
    element: <ProjectScreen />,
  },
]
