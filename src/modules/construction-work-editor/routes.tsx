import {RouteObject} from 'react-router-dom'
import CreateManagerScreen from 'modules/construction-work-editor/screens/CreateManager.screen'
import ProjectScreen from 'modules/construction-work-editor/screens/Project.screen'
import ProjectsScreen from 'modules/construction-work-editor/screens/Projects.screen'

export enum ConstructionWorkEditorRoute {
  project = '/project/:id',
  projects = '/projecten',
  createManager = '/manager/create',
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

  {
    path: ConstructionWorkEditorRoute.createManager,
    element: <CreateManagerScreen />,
  },
]
