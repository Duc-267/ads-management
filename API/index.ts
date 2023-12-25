import axios from 'axios'
import { AuthenticateParams } from 'constants/enum'
import { IRequestHeader, IServerError } from 'interfaces/authentication'

const API_URL = process.env.API_URL

export const api = axios.create({
  baseURL: API_URL
})

export function auth(): IRequestHeader {
  if (typeof window === 'undefined') {
    return {}
  }

  const headers = { Authorization: '', 'Content-Type': '' }
  const accessToken = localStorage.getItem(AuthenticateParams.ACCESS_TOKEN) || ''
  headers.Authorization = `Bearer ${accessToken}`
  headers['Content-Type'] = 'application/json'
  return headers
}

export const errorHandler = (error: IServerError): void => {
  switch (error?.statusCode) {
    case 401:
      redirectLogin()
      break
  }
}

function redirectLogin(): void {
  localStorage.setItem(AuthenticateParams.ACCESS_TOKEN, '')
  // Router.replace(routes.auth.login.value)
}
