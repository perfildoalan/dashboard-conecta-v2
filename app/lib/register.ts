import { z } from 'zod'

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' })
      .trim(),
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters long' })
      .max(50, { message: 'Username must be at most 50 characters long' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    typeUser: z.enum(['admin', 'user'], { message: 'Invalid user type' }),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
      })
    }
  })

export type RegisterFormState =
  | {
      errors?: {
        confirmPassword?: string[]
        email?: string[]
        name?: string[]
        password?: string[]
        typeUser?: string[]
        username?: string[]
      }
      message?: string
    }
  | undefined
