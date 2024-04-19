import {AzureGroup} from 'authentication/types'
import {Environment} from 'utils/environment'

/**
 * Azure Entra ID group IDs for each environment
 */
export const azureGroups = {
  [AzureGroup.admin]: {
    [Environment.local]: '8394d4d0-d326-4749-861c-d8c56815f13d',
    [Environment.development]: '8394d4d0-d326-4749-861c-d8c56815f13d',
    [Environment.test]: '1413ee8e-3fa5-4eda-8a59-b7e393b9561b',
    [Environment.acceptance]: 'c5b8c56a-e9f0-4069-a8cd-0ba58e29f620',
    [Environment.production]: 'd51c6a44-9684-420b-b3be-3d5c90daddc5',
  },
  [AzureGroup.editor]: {
    [Environment.local]: '',
    [Environment.development]: '',
    [Environment.test]: '',
    [Environment.acceptance]: '',
    [Environment.production]: '',
  },
  [AzureGroup.publisher]: {
    [Environment.local]: '',
    [Environment.development]: '',
    [Environment.test]: '',
    [Environment.acceptance]: '',
    [Environment.production]: '',
  },
}
