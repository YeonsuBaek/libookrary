import { BookSearchRequest } from './types/bookTypes'
import { FuncType } from './types/userTypes'

export const fetchNewSpecial = async ({ onSuccess, onError }: FuncType) => {
  try {
    const response = await fetch(`/api/book/newSpecial`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const list = data.item
    onSuccess(list)
  } catch (error) {
    onError(error)
  }
}

export const fetchBestseller = async ({ onSuccess, onError }: FuncType) => {
  try {
    const response = await fetch(`/api/book/bestseller`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const list = data.item
    onSuccess(list)
  } catch (error) {
    onError(error)
  }
}

export const fetchSearchBook = async ({ search }: BookSearchRequest, { onSuccess, onError }: FuncType) => {
  try {
    const response = await fetch(`/api/book/search?search=${search}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    if (data.errorCode && data.errorCode === 3) {
      onSuccess([])
    } else {
      const list = data.item
      onSuccess(list)
    }
  } catch (error) {
    onError(error)
  }
}
