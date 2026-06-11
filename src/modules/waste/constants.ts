import {AzureRole} from '@/authentication/types'

export const allowedAzureRoles = [
  AzureRole.wastePublisher,
  AzureRole.wasteDelegated,
  AzureRole.wasteNotificationPublisher,
  AzureRole.wasteNotificationDelegated,
  AzureRole.wasteRecyclePublisher,
  AzureRole.wasteRecycleDelegated,
]
