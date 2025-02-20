import { RegisterFormSchema } from '@/lib/register'
import { RegisterVehicleFormState } from '@/lib/registerVehicle'
import { api } from '@/utils/api'

export async function registerVehicleAction(
  state: RegisterVehicleFormState,
  formData: FormData,
) {
  const validateField = RegisterFormSchema.safeParse({
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

  api
    .post('/registerVehicle', {
      brand: formData.get('brand'),
      model: formData.get('model'),
      year: formData.get('year'),
      engine: formData.get('engine'),
      typeVehicle: formData.get('typeVehicle'),
      classVehicle: formData.get('classVehicle'),
    })
    .then(() => {
      return { message: 'Register successful' }
    })
    .catch(() => {
      return { error: 'Invalid data' }
    })

  return state
}
