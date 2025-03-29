'use server'
import { NewPasswordFormSchema } from '@/lib/newPassword'
import { postRequest } from '../utils/postRequest';

export async function newPasswordAction(state: { message: string } | undefined, formData: FormData): Promise<{ message: string } | undefined> {
  const validateFields = NewPasswordFormSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validateFields.success) {
    return { message: "Isto nao é um email" };
  }

  const { password } = validateFields.data

  try {
      const data = await postRequest('/v1/user-area/user/confirm-recovery-password', { password });
      console.log(data);
      return { message: "Login successful" };
    } catch (error) {
      console.error('Login failed', error);
      return { message: "Login failed" };
    }
}
