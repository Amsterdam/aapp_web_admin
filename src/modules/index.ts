import constructionWorkEditorModule from 'modules/construction-work-editor'
import {contactModule} from 'modules/contact'
import {downloadQrModule} from 'modules/download-qr'
import {homeModule} from 'modules/home'
import {releasesModule} from 'modules/releases'
import {swaggerModule} from 'modules/swagger'

const modules = [
  homeModule,
  releasesModule,
  constructionWorkEditorModule,
  contactModule,
  downloadQrModule,
  swaggerModule,
] as const

export default modules
