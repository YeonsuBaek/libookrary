import { BookmarkType } from '@/types/book'
import { create } from 'zustand'

interface FormStoreType {
  bookmarks: BookmarkType[]
  setBookmarks: (bm: { page: number; content: string }) => void
}

export const useFormStore = create<FormStoreType>((set: any) => ({
  bookmarks: [],
  setBookmarks: (bm: { page: number; content: string }) =>
    set((prev: { bookmarks: BookmarkType[] }) => ({
      bookmarks: [
        ...prev.bookmarks,
        { id: prev.bookmarks.length > 0 ? prev.bookmarks[prev.bookmarks.length - 1].id + 1 : 0, ...bm },
      ],
    })),
}))
