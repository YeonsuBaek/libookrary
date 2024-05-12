export interface BookType {
  isbn13: string
  title: string
  author: string
  cover: string
}

export interface UserBookType {
  title: string
  isbn: string
  depth: number
  height: number
  color: string
}

export interface BookmarkType {
  id: number
  page: number
  content: string
}
