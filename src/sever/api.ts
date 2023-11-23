import { $axios } from './index.ts'
import { InterfaceLoginReq } from '../type'

// 登录
export const loginApi = (params: InterfaceLoginReq) => {
  return $axios.post('/login', params)
}

// 创建用户
export const createUserApi = (params: InterfaceLoginReq) => {
  return $axios.post('/create', params)
}

// 获取用户信息
export const getUserInfoApi = () => {
  return $axios.get('/userInfo')
}

// 登出账号
export const logoutApi = () => {
  return $axios.post('/logout')
}
