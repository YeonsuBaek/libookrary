import { create } from 'zustand'

interface UserStoreType {
  isLoggedIn: boolean
  setIsLoggedIn: (state: boolean) => void
}

export const useUserStore = create<UserStoreType>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (state: boolean) => set(() => ({ isLoggedIn: state })),
}))
