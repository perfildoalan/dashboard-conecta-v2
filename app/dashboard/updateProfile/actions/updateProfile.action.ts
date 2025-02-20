'use server'

import { RegisterFormSchema, RegisterFormState } from '@/lib/register'
import { api } from '@/utils/api'

export async function updateProfileAction(
  state: RegisterFormState,
  formData: FormData,
) {
  const validateFiled = RegisterFormSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirmation: formData.get('password_confirmation') as string,
    username: formData.get('username') as string,
  })

  if (!validateFiled.success) {
    return {
      errors: validateFiled.error.errors,
    }
  }

  const { name, email, password, username } = validateFiled.data

  api
    .post('/updateProfile', {
      name,
      email,
      password,
      username,
    })
    .then(() => {
      return { message: 'Update successful' }
    })
    .catch(() => {
      return { error: 'Invalid data ' }
    })

  return state
}
