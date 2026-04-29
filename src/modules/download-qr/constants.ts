import {AzureRole} from '@/authentication/types'

export const allowedAzureRoles = [
  AzureRole.admin,
  AzureRole.constructionWorkEditor,
  AzureRole.constructionWorkEditorDeprecated,
  AzureRole.cityPassDelegated,
  AzureRole.contactOpeningsTimesDelegated,
]
