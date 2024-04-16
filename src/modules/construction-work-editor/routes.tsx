import {RouteObject} from 'react-router-dom'
import ArticleScreen from './screens/Article.screen'
import ProjectScreen from './screens/Project.screen'
import ProjectsScreen from './screens/Projects.screen'

export enum ConstructionWorkEditorRoute {
  article = '/bericht/:id',
  project = '/project/:id',
  projects = '/projecten',
}

export const routes: RouteObject[] = [
  {
    path: ConstructionWorkEditorRoute.article,
    element: <ArticleScreen />,
  },
  {
    path: ConstructionWorkEditorRoute.projects,
    element: <ProjectsScreen />,
  },
  {
    path: ConstructionWorkEditorRoute.project,
    element: <ProjectScreen />,
  },
]
