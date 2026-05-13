import {AMSTERDAM_EMAIL_REGEX} from '../constants'

export const isAmsterdamEmail = (
  email: string,
  errorMessage = "Ingevoerde e-mailadres eindigt niet op '@amsterdam.nl'",
) => AMSTERDAM_EMAIL_REGEX.test(email) || errorMessage
