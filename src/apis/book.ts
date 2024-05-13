import { collection, doc, getDoc, getDocs, query, where, updateDoc, setDoc } from 'firebase/firestore'
import { AladinBookInfoRequest, BookInfoRequest, BookSearchRequest, BookToUserRequest } from './types/bookTypes'
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

export const addBookToUser = async ({ isbn }: BookToUserRequest, { onSuccess, onError }: FuncType) => {
  try {
    const userToken = localStorage.getItem('userToken')
    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, userToken)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      console.error('회원 정보를 찾을 수 없습니다.')
    } else {
      const docData = response.data()
      const updatedBooks = [...docData.books, isbn]
      const nonDuplicateBooks = new Set(updatedBooks)
      await updateDoc(docRef, { books: Array.from(nonDuplicateBooks) })
      onSuccess()
    }
  } catch (error) {
    onError(error)
  }
}

export const saveBookInfo = async (info: BookInfoRequest, { onSuccess, onError }: FuncType) => {
  try {
    const {
      author,
      categoryName: category,
      cover,
      description: desc,
      isbn13: isbn,
      link,
      priceStandard: price,
      pubDate: pubdate,
      publisher,
      title,
      subInfo,
    } = info
    const collectionRef = collection(db, 'book')
    const docRef = doc(collectionRef, isbn)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      await setDoc(docRef, {
        author,
        category,
        cover,
        depth: subInfo.packing.sizeDepth,
        desc,
        height: subInfo.packing.sizeHeight,
        isbn,
        link,
        price,
        pubdate,
        publisher,
        title,
      })
    }

    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const saveUserSavedBook = async (info: any, { onSuccess, onError }: FuncType) => {
  try {
    const { isbn, startDate, endDate, bookmarks, isRecommended, wantToReRead } = info
    const userToken = localStorage.getItem('userToken')
    const collectionRef = collection(db, 'user_saved_books')
    const docRef = doc(collectionRef, userToken)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      console.error('회원 정보를 찾을 수 없습니다.')
    } else {
      await setDoc(docRef, {
        [isbn]: {
          startDate,
          endDate,
          bookmarks,
          special: {
            isRecommended,
            wantToReRead,
          },
        },
      })
      onSuccess()
    }
  } catch (error) {
    onError(error)
  }
}
