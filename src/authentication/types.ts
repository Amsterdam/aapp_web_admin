import {JwtPayload} from 'jwt-decode'

export enum AzureGroup {
  admin = 'admin',
  editor = 'editor', // omgevingsmanager / communicatieadviseur
  publisher = 'publisher', // redacteur
}

export type DecodedJWTToken = {
  groups?: string[]
} & JwtPayload
