import { z } from 'zod'

export const RegisterVehicleFormSchema = z.object({
  brand: z.string().min(1, { message: 'Brand is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  year: z.number().min(1900, { message: 'Year is required' }),
  engine: z.string().min(1, { message: 'Engine is required' }),
  typeVehicle: z.string().min(1, { message: 'Type Vehicle is required' }),
  classVehicle: z.string().min(1, { message: 'Class Vehicle is required' }),
})

export type RegisterVehicleFormState =
  | {
      errors?: {
        brand?: string
        model?: string
        year?: string
        engine?: string
        typeVehicle?: string
        classVehicle?: string
      }
      message?: string
    }
  | undefined
