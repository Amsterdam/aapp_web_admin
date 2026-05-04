import SurveyAdminHomeButton from '@/modules/survey/components/SurveyAdminHomeButton'
import {allowedAzureRoles} from '@/modules/survey/constants'
import {routes} from '@/modules/survey/routes'
import {ModuleSlug, ModuleType, type Module} from '@/modules/types'

export const surveyModule: Module = {
  allowedAzureRoles,
  HomeComponent: SurveyAdminHomeButton,
  routes,
  slug: ModuleSlug.survey,
  title: 'Survey',
  type: ModuleType.contentManagement,
}
