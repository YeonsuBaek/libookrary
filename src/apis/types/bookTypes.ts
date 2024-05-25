import { BookmarkType } from '@/types/book'

export interface BookSearchRequest {
  search: string
  startIndex: number
}

export interface AladinBookInfoRequest {
  isbn: string
}

export interface BookInfoRequest {
  isbn: string
  userToken: string
}

export interface BookToUserRequest {
  isbn: string
  title: string
  depth: string
  height: string
  author: string
  cover: string
}

export interface EditedBookToUserRequest {
  isbn: string
  startDate: string
  endDate: string
  bookmarks: BookmarkType[]
  isRecommended: boolean
  wantToReRead: boolean
}

export interface BookInfoGettingRequest {
  isbn: string
}

export interface BookInfoRequest {
  author: string
  categoryName: string
  cover: string
  description: string
  isbn13: string
  link: string
  priceStandard: number
  pubDate: string
  publisher: string
  title: string
  subInfo: {
    packing: {
      sizeDepth: number
      sizeHeight: number
    }
  }
}

export interface UserBookDetailInfoRequest {
  isbn: string
}

export interface DeletedBookRequest {
  isbn: string
}
