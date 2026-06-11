import {JwtPayload} from 'jwt-decode'

export enum AzureRole {
  admin = 'admin',
  constructionWorkEditorDeprecated = 'constructionWorkEditorDeprecated', // redacteur deprecated rol. Vervangen door constructionWorkEditor!
  constructionWorkEditor = 'constructionWorkEditor', // redacteur
  constructionWorkPublisher = 'constructionWorkPublisher', // omgevingsmanager / communicatieadviseur
  contactOpeningsTimesDelegated = 'contactOpeningsTimesDelegated', // voor openingstijden van contact, rechten toewijzen
  contactOpeningsTimesPublisher = 'contactOpeningsTimesPublisher', // voor openingstijden van contact
  cityPassDelegated = 'cityPassDelegated', // voor stadspas notificaties, rechten toewijzen
  cityPassPublisher = 'cityPassPublisher', // voor stadspas notificaties
  surveyDelegated = 'surveyDelegated', // voor vragenlijsten bijwerken, rechten toewijzen
  surveyPublisher = 'surveyPublisher', // voor vragenlijsten bijwerken
  wasteDelegated = 'wasteDelegated', // voor A&G notificaties en recycle, rechten toewijzen
  wastePublisher = 'wastePublisher', // voor A&G notificaties en recycle
  wasteRecycleDelegated = 'wasteRecycleDelegated', // voor A&G recycle, rechten toewijzen
  wasteRecyclePublisher = 'wasteRecyclePublisher', // voor A&G recycle
  wasteNotificationDelegated = 'wasteNotificationDelegated', // voor A&G notificaties, rechten toewijzen
  wasteNotificationPublisher = 'wasteNotificationPublisher', // voor A&G notificaties
}

export type DecodedJWTToken = {
  roles?: string[]
} & JwtPayload
