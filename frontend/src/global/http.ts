import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})
const setToken = (token: string) => {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  http.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        window.location.replace('/login')
        throw new Error('Unauthorized')
      }

      return Promise.reject(error)
    }
  )
}

export { http, setToken }
