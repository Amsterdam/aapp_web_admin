import {adminModule} from 'modules/admin'
import {cityPassModule} from 'modules/city-pass'
import constructionWorkEditorModule from 'modules/construction-work-editor'
import {contactModule} from 'modules/contact'
import {downloadQrModule} from 'modules/download-qr'
import {homeModule} from 'modules/home'
import {surveyModule} from 'modules/survey'
import {swaggerModule} from 'modules/swagger'
import {wasteModule} from 'modules/waste'

const modules = [
  homeModule,
  adminModule,
  constructionWorkEditorModule,
  contactModule,
  surveyModule,
  cityPassModule,
  downloadQrModule,
  swaggerModule,
  wasteModule,
] as const

export default modules
