import ConstructionWorkEditorHome from 'modules/construction-work-editor/components/ConstructionWorkEditorHome'
import {allowedAzureGroups} from 'modules/construction-work-editor/constants'
import {routes} from 'modules/construction-work-editor/routes'
import {ModuleSlug, ModuleType, type Module} from 'modules/types'

const constructionWorkEditorModule: Module = {
  allowedAzureGroups,
  HomeComponent: ConstructionWorkEditorHome,
  routes,
  slug: ModuleSlug.constructionWorkEditor,
  title: 'Werkzaamheden',
  type: ModuleType.contentManagement,
}

export default constructionWorkEditorModule
