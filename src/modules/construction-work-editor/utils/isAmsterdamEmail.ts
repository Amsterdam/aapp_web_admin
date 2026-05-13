import {AMSTERDAM_EMAIL_REGEX} from '@/modules/construction-work-editor/constants'

export const isAmsterdamEmail = (email: string) =>
  AMSTERDAM_EMAIL_REGEX.test(email.trim().toLowerCase()) ||
  "Ingevoerde e-mailadres eindigt niet op '@amsterdam.nl'"
