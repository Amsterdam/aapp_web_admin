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
    [Environment.local]: '56da75ab-a627-4b80-b042-f0c2a755e422',
    [Environment.development]: '56da75ab-a627-4b80-b042-f0c2a755e422',
    [Environment.test]: '1494fe11-17cd-4fe5-bd8b-5d8aa56fb7f2',
    [Environment.acceptance]: '40e5e5d6-3415-49cb-8b76-6ae449d942c6',
    [Environment.production]: '82737865-baa5-43df-b5c1-6b85c1b559c4',
  },
  [AzureGroup.publisher]: {
    [Environment.local]: '271b2539-e951-4b1b-bd29-fc3b2265d469',
    [Environment.development]: '271b2539-e951-4b1b-bd29-fc3b2265d469',
    [Environment.test]: '537bce86-fe7b-4822-93bc-f08adba6b229',
    [Environment.acceptance]: '148f2ea6-80c0-494d-871b-73f220345086',
    [Environment.production]: '5b3fc61a-fc21-46d3-8e5f-0a3307258be2',
  },
}
