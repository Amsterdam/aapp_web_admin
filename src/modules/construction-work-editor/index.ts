import CWEHome from 'modules/construction-work-editor/components/CWEHome'
import {allowedAzureGroups} from 'modules/construction-work-editor/constants'
import {routes} from 'modules/construction-work-editor/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

const constructionWorkEditorModule: Module = {
  allowedAzureGroups,
  HomeComponent: CWEHome,
  routes,
  slug: ModuleSlug.constructionWorkEditor,
  type: ModuleType.contentManagement,
}

export default constructionWorkEditorModule
