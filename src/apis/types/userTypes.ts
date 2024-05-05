export interface SignUpRequest {
  email: string
  password: string
  nickname: string
}

export interface SignInRequest {
  email: string
  password: string
}

export interface UserInfoResponse {
  nickname: string
  books: string[]
}
export interface UserInfoRequest {
  userToken: string
}
