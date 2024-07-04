import { create } from 'zustand'

type fetchStateType = 'idle' | 'loading' | 'fetched' | 'error'

interface SearchStoreType {
  searchWord: string
  setSearchWord: (word: string) => void
  fetchState: fetchStateType
  setFetchState: (state: fetchStateType) => void
  books: any[]
  setAddBooks: (book: any[]) => void
  setNewBooks: (book: any[]) => void
  searchIndex: number
  setSearchIndex: (index: number) => void
}

export const useSearchStore = create<SearchStoreType>((set) => ({
  searchWord: '',
  setSearchWord: (word: string) => set({ searchWord: word }),
  fetchState: 'idle' as fetchStateType,
  setFetchState: (state: fetchStateType) => set({ fetchState: state }),
  books: [],
  setAddBooks: (book: any[]) =>
    set((prev) => ({
      books: [...prev.books, ...book],
    })),
  setNewBooks: (book: any[]) => set({ books: book }),
  searchIndex: 1,
  setSearchIndex: (index) => set({ searchIndex: index }),
}))
