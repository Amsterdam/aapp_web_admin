import constructionWorkEditorModule from 'modules/construction-work-editor'
import {downloadQrModule} from 'modules/download-qr'
import {homeModule} from 'modules/home'
import {releasesModule} from 'modules/releases'
import {swaggerModule} from 'modules/swagger'

const modules = [
  homeModule,
  releasesModule,
  constructionWorkEditorModule,
  downloadQrModule,
  swaggerModule,
] as const

export default modules
