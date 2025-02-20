import { z } from 'zod'

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
})

export type ForgotPasswordFormState =
  | {
      errors?: {
        email?: string[]
      }
      message?: string
    }
  | undefined
