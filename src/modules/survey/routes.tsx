import {RouteObject} from 'react-router-dom'
import SurveyAdminScreen from './screens/SurveyAdmin.screen'
import {SurveyRoute} from './types'
import {surveyModule} from '.'

const loader = () => surveyModule.allowedAzureRoles

export const routes: RouteObject[] = [
  {
    loader,
    path: SurveyRoute.admin,
    element: <SurveyAdminScreen />,
  },
]
