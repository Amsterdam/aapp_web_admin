import {AzureGroup} from 'authentication/types'
import CWEHome from 'modules/construction-work-editor/components/CWEHome'
import {routes} from 'modules/construction-work-editor/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

const constructionWorkEditorModule: Module = {
  allowedAzureGroups: [AzureGroup.editor, AzureGroup.publisher],
  HomeComponent: CWEHome,
  routes,
  slug: ModuleSlug.constructionWorkEditor,
  type: ModuleType.contentManagement,
}

export default constructionWorkEditorModule
