import type {Publisher} from '../types/publisher'

export const isNewPublisher = (
  email: string,
  existingPublishers: Publisher[],
  errorMessage = 'Deze publisher bestaat al',
) => !existingPublishers.some(p => p.email === email) || errorMessage
