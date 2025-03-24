'user server'

import { RegisterFormSchema } from '@/lib/register'
import { postRequest } from '../utils/postRequest';

export async function registerAction( state: { message: string } | undefined, formData: FormData): Promise<{ message: string } | undefined>  {
  const validateField = RegisterFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    username: formData.get('username'),
    name: formData.get('name'),
    typeUser: formData.get('typeUser'),
    jwt: formData.get('jwt'),
  })

  if (!validateField.success) {
    return { message: "Isto nao é um email" };
  }

  const { password, username, name, typeUser, jwt } = validateField.data

try {
    const data = await postRequest('/v1/user-area/user/send-register-email', { name, username, password,profile_image: '',roles: typeUser, client_name: '', jwt });
    console.log(data);
    return { message: "Login successful" };
  } catch (error) {
    console.error('Login failed', error);
    return { message: "Login failed" };
  }
}
