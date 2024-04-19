import {constructionWorkEditorModule} from 'modules/construction-work-editor'
import {downloadQrModule} from 'modules/download-qr'
import {homeModule} from 'modules/home'
import {releasesModule} from 'modules/releases'

const modules = [
  homeModule,
  releasesModule,
  constructionWorkEditorModule,
  downloadQrModule,
] as const

export default modules
