export interface InterfaceLoginReq {
  username: string
  password: string
}

export interface UserInfoRes {
  username: string
  iat: number
  exp: number
}
