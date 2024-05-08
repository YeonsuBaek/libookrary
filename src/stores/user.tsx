import { create } from 'zustand'

interface UserStoreType {
  isLoggedIn: boolean
  setIsLoggedIn: (state: boolean) => void
  email: string
  setEmail: (val: string) => void
  nickname: string
  setNickname: (val: string) => void
}

export const useUserStore = create<UserStoreType>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (state: boolean) => set(() => ({ isLoggedIn: state })),
  email: '',
  setEmail: (val: string) => set(() => ({ email: val })),
  nickname: '',
  setNickname: (val: string) => set(() => ({ nickname: val })),
}))
