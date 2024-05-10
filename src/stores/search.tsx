import { create } from 'zustand'

interface SearchStoreType {
  isOpenSearch: boolean
  setIsOpenSearch: (state: boolean) => void
}

export const useSearchStore = create<SearchStoreType>((set) => ({
  isOpenSearch: false,
  setIsOpenSearch: (state: boolean) => set({ isOpenSearch: state }),
}))
