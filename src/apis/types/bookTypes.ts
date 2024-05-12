export interface BookSearchRequest {
  search: string
}

export interface AladinBookInfoRequest {
  isbn: string
}

export interface BookInfoRequest {
  isbn: string
  userToken: string
}
