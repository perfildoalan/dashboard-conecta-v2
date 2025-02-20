'use server'
import { NewPasswordFormState, NewPasswordFormSchema } from '@/lib/newPassword'
import { api } from '@/utils/api'

export async function newPasswordAction(
  state: NewPasswordFormState,
  formData: FormData,
) {
  const validateField = NewPasswordFormSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
    }
  }

  const { password, confirmPassword } = validateField.data

  api
    .post('/new-password', { password, confirmPassword })
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
