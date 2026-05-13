import type {Publisher} from '@/modules/construction-work-editor/types/publisher'

export const isNewPublisher = (
  email: string,
  existingPublishers: Publisher[],
) =>
  !existingPublishers.some(
    p => p.email.trim().toLowerCase() === email.trim().toLowerCase(),
  ) || 'Deze publisher bestaat al'
