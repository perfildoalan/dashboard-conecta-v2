'use server'

import { SignupFormSchema } from '@/lib/loginDefinition'
import { postRequestLogin } from '@/(home)/utils/postRequest';

export async function loginAction( state: { message: string } | undefined, formData: FormData): Promise<{ message: string } | undefined>{
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { message: "Failed to Login" };
  }

  const { username, password } = validatedFields.data

  try {
    const data = await postRequestLogin('/v1/user-area/user/login', { username, password });
    console.log(data);
    return { message: "Login successful" };
  } catch (error) {
    console.error('Login failed', error);
    return { message: "Login failed" };
  }
}
