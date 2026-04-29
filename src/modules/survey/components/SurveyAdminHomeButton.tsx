import NavigationButton from '@/components/ui/button/NavigationButton'
import {SurveyRoute} from '../types'

const SurveyAdminHomeButton = () => (
  <NavigationButton
    label="Beheer vragenlijsten"
    url={SurveyRoute.admin}
  />
)

export default SurveyAdminHomeButton
