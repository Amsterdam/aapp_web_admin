import {AzureRole} from 'authentication/types'
import {Environment} from 'utils/environment'

/**
 * Azure Entra ID role for each environment
 */
export const AzureRoles = {
  [AzureRole.admin]: {
    [Environment.local]: 'o-mbs-admin',
    [Environment.development]: 'o-mbs-admin',
    [Environment.test]: 't-mbs-admin',
    [Environment.acceptance]: 'a-mbs-admin',
    [Environment.production]: 'p-mbs-admin',
  },
  [AzureRole.constructionWorkEditorDeprecated]: {
    [Environment.local]: 'o-pbs-editor',
    [Environment.development]: 'o-pbs-editor',
    [Environment.test]: 't-pbs-editor',
    [Environment.acceptance]: 'a-pbs-editor',
    [Environment.production]: 'p-pbs-editor',
  },
  [AzureRole.constructionWorkEditor]: {
    [Environment.local]: 'o-pbs-editor-delegated',
    [Environment.development]: 'o-pbs-editor-delegated',
    [Environment.test]: 't-pbs-editor-delegated',
    [Environment.acceptance]: 'a-pbs-editor-delegated',
    [Environment.production]: 'p-pbs-editor-delegated',
  },
  [AzureRole.constructionWorkPublisher]: {
    [Environment.local]: 'o-pbs-publisher',
    [Environment.development]: 'o-pbs-publisher',
    [Environment.test]: 't-pbs-publisher',
    [Environment.acceptance]: 'a-pbs-publisher',
    [Environment.production]: 'p-pbs-publisher',
  },
  [AzureRole.contactOpeningsTimesDelegated]: {
    [Environment.local]: 'o-cbs-time-delegated',
    [Environment.development]: 'o-cbs-time-delegated',
    [Environment.test]: 't-cbs-time-delegated',
    [Environment.acceptance]: 'a-cbs-time-delegated',
    [Environment.production]: 'p-cbs-time-delegated',
  },
  [AzureRole.contactOpeningsTimesPublisher]: {
    [Environment.local]: 'o-cbs-time-publisher',
    [Environment.development]: 'o-cbs-time-publisher',
    [Environment.test]: 't-cbs-time-publisher',
    [Environment.acceptance]: 'a-cbs-time-publisher',
    [Environment.production]: 'p-cbs-time-publisher',
  },
  [AzureRole.cityPassDelegated]: {
    [Environment.local]: 'o-city-pass-delegated',
    [Environment.development]: 'o-city-pass-delegated',
    [Environment.test]: 't-city-pass-delegated',
    [Environment.acceptance]: 'a-city-pass-delegated',
    [Environment.production]: 'p-city-pass-delegated',
  },
  [AzureRole.cityPassPublisher]: {
    [Environment.local]: 'o-city-pass-publisher',
    [Environment.development]: 'o-city-pass-publisher',
    [Environment.test]: 't-city-pass-publisher',
    [Environment.acceptance]: 'a-city-pass-publisher',
    [Environment.production]: 'p-city-pass-publisher',
  },
}
