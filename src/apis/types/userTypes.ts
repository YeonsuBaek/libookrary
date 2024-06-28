import { LanguageType } from '@/types/user'

export interface FuncType {
  onSuccess: (res?: any) => void
  onError: (error: any) => void
}

export interface SignUpRequest {
  email: string
  password: string
  nickname: string
  language: LanguageType
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
  userToken: string | null
}

export interface EditUserInfoRequest {
  email: string
  nickname: string
  language: LanguageType
}
