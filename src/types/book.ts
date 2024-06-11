export interface BookType {
  isbn13: string
  title: string
  author: string
  cover: string
  depth: number
  height: number
  color: string
}

export interface UserBookType {
  isbn: string
  title: string
  author: string
  cover: string
  depth: number
  height: number
  color: string
}

export interface BookmarkType {
  id: number
  page: string
  content: string
}

export type SpecialType = 'reread' | 'recommend'

export enum SPECIAL_VALUES {
  reread = 'reread',
  recommend = 'recommend',
}
