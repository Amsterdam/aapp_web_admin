import {AzureGroup} from 'authentication/types'
import CWEHome from 'modules/construction-work-editor/components/CWEHome'
import {routes} from 'modules/construction-work-editor/routes'
import {ModuleSlug, type Module} from 'modules/types'

export const constructionWorkEditorModule: Module = {
  allowedAzureGroups: [
    AzureGroup.admin,
    AzureGroup.editor,
    AzureGroup.publisher,
  ],
  HomeComponent: CWEHome,
  routes,
  slug: ModuleSlug.constructionWorkEditor,
}
