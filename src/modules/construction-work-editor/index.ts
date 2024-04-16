import CWEHome from 'modules/construction-work-editor/components/CWEHome'
import {routes} from 'modules/construction-work-editor/routes'
import {type Module} from 'modules/types'

export const constructionWorkEditorModule: Module = {
  HomeComponent: CWEHome,
  routes,
}
