import { create } from 'zustand'

export interface UserStore {
  isLoggedIn: boolean
  setIsLoggedIn: (state: boolean) => void
}

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}))

export default useUserStore
