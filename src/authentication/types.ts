import {JwtPayload} from 'jwt-decode'

export enum AzureGroup {
  admin = 'admin',
  editor = 'editor', // redacteur
  publisher = 'publisher', // omgevingsmanager / communicatieadviseur
}

export type DecodedJWTToken = {
  groups?: string[]
} & JwtPayload
