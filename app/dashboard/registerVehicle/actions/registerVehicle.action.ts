'use server'

import { postRequest } from '@/dashboard/utils/postRequest';
import {
  RegisterVehicleFormSchema,
} from '@/lib/registerVehicle'

export async function registerVehicleAction(
  state: { message: string } | undefined, formData: FormData): Promise<{ message: string } | undefined> {
  const validateField = RegisterVehicleFormSchema.safeParse({
    brand: formData.get('brand') as string,
    model: formData.get('model') as string,
    year: Number(formData.get('year')),
    engine: formData.get('engine') as string,
    typeVehicle: formData.get('typeVehicle') as string,
    classVehicle: formData.get('classVehicle') as string,
  })

  if (!validateField.success) {
    return { message: "Isto nao é um email" };
  }

  const { brand, model, year, engine, typeVehicle, classVehicle } =
    validateField.data

 try {
     const data = await postRequest(`/v1/user-area/vehicle/register/${vehicle_id}`);
     console.log(data);
     return { message: "Login successful" };
   } catch (error) {
     console.error('Login failed', error);
     return { message: "Login failed" };
   }

}
