import axios, { AxiosInstance } from 'axios'

let api: AxiosInstance
let apiI18n: AxiosInstance

if (process.env.NEXT_PUBLIC_MODE === 'development') {
  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'content-type': 'application/json',
    },
  })

  apiI18n = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_I18N,
    headers: {
      'content-type': 'application/json',
    },
  })
} else {
  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_TESTE,
    headers: {
      'content-type': 'application/json',
    },
  })

  apiI18n = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_I18N_TEST,
    headers: {
      'content-type': 'application/json',
    },
  })
}

export { api, apiI18n }
