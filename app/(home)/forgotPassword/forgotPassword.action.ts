'use server'

import {
  ForgotPasswordFormSchema,
} from '@/lib/forgotPassword'
import { postRequest } from '../utils/postRequest';

export async function forgotPasswordAction( state: { message: string } | undefined, formData: FormData): Promise<{ message: string } | undefined> {
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return { message: "Isto nao é um email" };
  }

  const { email } = validatedFields.data

try {
    const data = await postRequest('/v1/user-area/user/send-recovery-password-email', { email });
    console.log(data);
    return { message: "Login successful" };
  } catch (error) {
    console.error('Login failed', error);
    return { message: "Login failed" };
  }
}
