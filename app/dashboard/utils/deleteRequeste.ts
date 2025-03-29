'use server'
import { cookies } from 'next/headers'

//eslint-disable-next-line
export async function deleteRequest(url: string, data?: any, cache: RequestCache = 'no-store'): Promise<any> {
    let API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    if (process.env.NEXT_PUBLIC_API_BASE_MODE === 'test') {
      API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_TESTE;
    }
    
    const fullUrl = `${API_BASE_URL}${url}`;
  
    const cookieStore = await cookies()
  
    const userData = cookieStore.get('user_data');
  
    const token = userData ? JSON.parse(userData.value).access_token : null;
  
    try {
      const response = await fetch(fullUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Inclui o token Bearer
        },
        body: JSON.stringify(data),
        cache: cache,
      });
  
      if (!response.ok) {
        console.error('Response not ok', response);
        throw new Error('Request failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Request failed', error);
      throw error;
    }
  }