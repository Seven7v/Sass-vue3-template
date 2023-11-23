import axios from 'axios'
import { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const baseUrl = '/api'
export const $axios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

$axios.interceptors.request.use(config => {
  var xtoken: any = localStorage.getItem('token')
  if (xtoken) {
    xtoken = xtoken
    config.headers['Authorization'] = xtoken
  }
  return config
})
$axios.interceptors.response.use(
  (res: any) => {
    const { code, message } = res.data
    if (code === 200) {
      if (message) {
        ElMessage.success(message)
      }
      return res
    } else {
      ElMessage.error(res.massage)
      return Promise.reject(new Error(res.message))
    }
  },
  (err: any) => {
    const message = err.response.data
    ElMessage.error(message)
    return Promise.reject(new Error(err.message))
  }
)
