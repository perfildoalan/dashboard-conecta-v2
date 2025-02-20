'user server'

import { RegisterFormState, RegisterFormSchema } from '@/lib/register'
import { api } from '@/utils/api'

export async function registerAction(
  state: RegisterFormState,
  formaData: FormData,
) {
  const validateField = RegisterFormSchema.safeParse({
    email: formaData.get('email'),
    password: formaData.get('password'),
    confirmPassword: formaData.get('confirmPassword'),
    username: formaData.get('username'),
    name: formaData.get('name'),
    typeUser: formaData.get('typeUser'),
  })

  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
    }
  }

  const { email, password, confirmPassword, username, name, typeUser } =
    validateField.data

  api
    .post('/register', {
      email,
      password,
      confirmPassword,
      username,
      name,
      typeUser,
    })
    .then(() => {
      if (state) {
        state.message = 'Register successful'
      }
      return state
    })
    .catch(() => {
      return { error: 'Invalid data' }
    })

  return state
}
