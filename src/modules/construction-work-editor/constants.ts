import {AzureRole} from '@/authentication/types'

export const allowedAzureRoles = [
  AzureRole.constructionWorkEditorDeprecated,
  AzureRole.constructionWorkEditor,
  AzureRole.constructionWorkPublisher,
]

export const AMSTERDAM_EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@amsterdam\.nl$/
