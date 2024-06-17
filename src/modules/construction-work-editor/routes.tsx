import {RouteObject} from 'react-router-dom'
import {AzureGroup} from 'authentication/types'
import constructionWorkEditorModule from 'modules/construction-work-editor'
import ArticleScreen from 'modules/construction-work-editor/screens/Article.screen'
import ProjectScreen from 'modules/construction-work-editor/screens/Project.screen'
import ProjectsScreen from 'modules/construction-work-editor/screens/Projects.screen'
import PublisherScreen from 'modules/construction-work-editor/screens/Publisher.screen'
import PublisherProjectsScreen from 'modules/construction-work-editor/screens/PublisherProjects.screen'
import PublishersScreen from 'modules/construction-work-editor/screens/Publishers.screen'
import {ConstructionWorkEditorRoute} from 'modules/construction-work-editor/types/routes'

const loader = () => constructionWorkEditorModule.allowedAzureGroups
const loaderEditor = () => [AzureGroup.editor]

export const routes: RouteObject[] = [
  {
    loader,
    path: ConstructionWorkEditorRoute.article,
    element: <ArticleScreen />,
  },
  {
    loader: loaderEditor,
    path: ConstructionWorkEditorRoute.publishers,
    element: <PublishersScreen />,
  },
  {
    loader,
    path: ConstructionWorkEditorRoute.projects,
    element: <ProjectsScreen />,
  },
  {
    loader,
    path: ConstructionWorkEditorRoute.project,
    element: <ProjectScreen />,
  },
  {
    loader: loaderEditor,
    path: ConstructionWorkEditorRoute.publisher,
    element: <PublisherScreen />,
  },
  {
    loader: loaderEditor,
    path: ConstructionWorkEditorRoute.publisherProjects,
    element: <PublisherProjectsScreen />,
  },
]
