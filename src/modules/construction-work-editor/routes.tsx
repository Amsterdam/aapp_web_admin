import {RouteObject} from 'react-router-dom'
import ArticleScreen from 'modules/construction-work-editor/screens/Article.screen'
import ProjectScreen from 'modules/construction-work-editor/screens/Project.screen'
import ProjectsScreen from 'modules/construction-work-editor/screens/Projects.screen'
import PublisherScreen from 'modules/construction-work-editor/screens/Publisher.screen'
import EditorsScreen from './screens/Editors.screen'

export enum ConstructionWorkEditorRoute {
  article = '/bericht',
  editors = '/redacteuren',
  project = '/project',
  projects = '/projecten',
  publisher = '/publisher',
}

export const routes: RouteObject[] = [
  {
    path: `${ConstructionWorkEditorRoute.article}/:id?`,
    element: <ArticleScreen />,
  },
  {
    path: `${ConstructionWorkEditorRoute.editors}`,
    element: <EditorsScreen />,
  },
  {
    path: ConstructionWorkEditorRoute.projects,
    element: <ProjectsScreen />,
  },
  {
    path: `${ConstructionWorkEditorRoute.project}/:id`,
    element: <ProjectScreen />,
  },
  {
    path: `${ConstructionWorkEditorRoute.publisher}/:email?`,
    element: <PublisherScreen />,
  },
]
