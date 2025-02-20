'use server'
import { api } from '@/utils/api'
import { SignupFormState, SignupFormSchema } from '@/lib/loginDefinition'

export async function loginAction(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, password } = validatedFields.data

  api
    .post('/login', { username, password })
    .then(() => {
      if (state) {
        state.message = 'Login successful'
      }
      return state
    })
    .catch(() => {
      return { error: 'Invalid username or password' }
    })
  return state
}
