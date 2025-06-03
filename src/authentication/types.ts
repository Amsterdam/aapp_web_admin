import {JwtPayload} from 'jwt-decode'

export enum AzureGroup {
  admin = 'admin',
  editor = 'editor', // redacteur
  publisher = 'publisher', // omgevingsmanager / communicatieadviseur
  contactOpeningsTimesPublisher = 'contactOpeningsTimesPublisher', // voor openingstijden van contact
}

export type DecodedJWTToken = {
  groups?: string[]
} & JwtPayload
