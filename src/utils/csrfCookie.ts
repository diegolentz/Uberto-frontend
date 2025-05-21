import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios'

export async function httpRequest<T>(request: AxiosRequestConfig): Promise<T> {
  const token = localStorage.getItem("token") ?? ''
  const headers = request.headers as AxiosHeaders ?? new AxiosHeaders()
  headers.setAuthorization(`Bearer ${token}`)
  const okRequest = {
    ...request,
    headers,
    withXSRFToken: true,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
  }
  const response = await axios(okRequest)
  return response.data
}