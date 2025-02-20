'use server'

import {
  ForgotPasswordFormSchema,
  ForgotPasswordFormState,
} from '@/lib/forgotPassword'
import { api } from '@/utils/api'

export async function forgotPasswordAction(
  state: ForgotPasswordFormState,
  formData: FormData,
) {
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email } = validatedFields.data

  api
    .post('/forgot-password', { email })
    .then(() => {
      if (state) {
        state.message = 'Password reset email sent'
      }
      return state
    })
    .catch(() => {
      return { error: 'Invalid email' }
    })
  return state
}
