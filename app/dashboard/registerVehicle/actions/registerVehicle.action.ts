'use server'

import {
  RegisterVehicleFormSchema,
  RegisterVehicleFormState,
} from '@/lib/registerVehicle'
import { api } from '@/utils/api'

export async function registerVehicleAction(
  state: RegisterVehicleFormState,
  formData: FormData,
) {
  const validateField = RegisterVehicleFormSchema.safeParse({
    brand: formData.get('brand') as string,
    model: formData.get('model') as string,
    year: Number(formData.get('year')),
    engine: formData.get('engine') as string,
    typeVehicle: formData.get('typeVehicle') as string,
    classVehicle: formData.get('classVehicle') as string,
  })

  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
    }
  }

  const { brand, model, year, engine, typeVehicle, classVehicle } =
    validateField.data

  api
    .post('/registerVehicle', {
      brand,
      model,
      year,
      engine,
      typeVehicle,
      classVehicle,
    })
    .then(() => {
      return { message: 'Register successful' }
    })
    .catch(() => {
      return { error: 'Invalid data' }
    })

  return state
}
