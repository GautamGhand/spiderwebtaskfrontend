import axios from 'axios'
import router from './router' // make sure this path is correct

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
})

// Interceptor to catch 401 errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
