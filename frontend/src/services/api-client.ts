
import axios from 'axios'

export const apiClient = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
    },
)

apiClient.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  if (error.response && error.response.status < 500) {
    return error.response;
  }
    return Promise.reject(error);
})
