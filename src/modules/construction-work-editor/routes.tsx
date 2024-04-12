import {RouteObject} from 'react-router-dom'
import CreatePublisherScreen from 'modules/construction-work-editor/screens/CreatePublisher.screen'
import ProjectScreen from 'modules/construction-work-editor/screens/Project.screen'
import ProjectsScreen from 'modules/construction-work-editor/screens/Projects.screen'
import EditPublisherScreen from './screens/EditPublisher.screen'

export enum ConstructionWorkEditorRoute {
  project = '/project/:id',
  projects = '/projecten',
  createPublisher = '/publisher/create',
  editPublisher = '/publisher/edit/:id',
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
    path: ConstructionWorkEditorRoute.createPublisher,
    element: <CreatePublisherScreen />,
  },
  {
    path: ConstructionWorkEditorRoute.editPublisher,
    element: <EditPublisherScreen />,
  },
]
