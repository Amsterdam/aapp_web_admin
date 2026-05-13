import type {Publisher} from '@/modules/construction-work-editor/types/publisher'

export const isNewPublisher = (
  email: string,
  existingPublishers: Publisher[],
  errorMessage = 'Deze publisher bestaat al',
) =>
  !existingPublishers.some(
    p => p.email.trim().toLowerCase() === email.trim().toLowerCase(),
  ) || errorMessage
