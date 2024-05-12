import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { AladinBookInfoRequest, BookInfoRequest, BookSearchRequest } from './types/bookTypes'
import { FuncType } from './types/userTypes'
import { db } from '../../firebase.config'

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
      console.log(list)
      onSuccess(list)
    }
  } catch (error) {
    onError(error)
  }
}

export const fetchAladinBookInfo = async ({ isbn }: AladinBookInfoRequest, { onSuccess, onError }: FuncType) => {
  try {
    const response = await fetch(`/api/book/info?isbn=${isbn}`)
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

export const getBookInfo = async ({ isbn }: BookInfoRequest) => {
  try {
    const userQuery = query(collection(db, 'book'), where('isbn', '==', isbn))
    const dataSnapShot = await getDocs(userQuery)

    if (dataSnapShot.empty) {
      console.error('도서 정보를 찾을 수 없습니다.')
      return null
    }

    const bookData = dataSnapShot.docs[0].data()
    return bookData
  } catch (error) {
    console.error('도서 정보를 가져오는 데 실패하였습니다.')
  }
}

export const getUserBookDetailInfo = async ({ isbn, userToken }: BookInfoRequest) => {
  try {
    const docRef = doc(db, 'user_saved_books', userToken)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.error('도서 정보를 찾을 수 없습니다.')
      return null
    }

    const bookInfo = docSnap.data()
    return bookInfo[isbn]
  } catch (error) {
    console.error('도서 정보를 가져오는 데 실패하였습니다.')
  }
}
