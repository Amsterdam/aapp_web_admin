import {AMSTERDAM_EMAIL_REGEX} from '@/modules/construction-work-editor/constants'

export const isAmsterdamEmail = (
  email: string,
  errorMessage = "Ingevoerde e-mailadres eindigt niet op '@amsterdam.nl'",
) => AMSTERDAM_EMAIL_REGEX.test(email.trim().toLowerCase()) || errorMessage
