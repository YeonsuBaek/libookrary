import { collection, doc, getDoc, getDocs, query, where, updateDoc, setDoc, deleteField } from 'firebase/firestore'
import {
  AladinBookInfoRequest,
  BookInfoGettingRequest,
  BookInfoRequest,
  BookSearchRequest,
  BookToUserRequest,
  DeletedBookRequest,
  EditedBookToUserRequest,
  UserBookDetailInfoRequest,
} from './types/bookTypes'
import { FuncType } from './types/userTypes'
import { db } from '../../firebase.config'
import { getBookColor } from '@/utils/color'

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

export const fetchAladinBookInfo = async ({ isbn }: AladinBookInfoRequest) => {
  try {
    const response = await fetch(`/api/book/info?isbn=${isbn}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    if (data.errorCode && data.errorCode === 3) {
      return []
    } else {
      const list = data.item
      return list[0]
    }
  } catch (error) {
    console.error(error)
  }
}

export const getBookInfo = async ({ isbn }: BookInfoGettingRequest) => {
  try {
    const userQuery = query(collection(db, 'book'), where('isbn', '==', isbn))
    const dataSnapShot = await getDocs(userQuery)

    if (dataSnapShot.empty) {
      return null
    }

    const bookData = dataSnapShot.docs[0].data()
    return bookData
  } catch (error) {
    console.error('도서 정보를 가져오는 데 실패하였습니다.')
  }
}

export const getUserBookDetailInfo = async ({ isbn }: UserBookDetailInfoRequest) => {
  try {
    const userToken = localStorage.getItem('userToken') || ''
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

export const addBookToUser = async (
  { isbn, title, depth, height, author, cover }: BookToUserRequest,
  { onSuccess, onError }: FuncType
) => {
  try {
    const userToken = localStorage.getItem('userToken') || ''
    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, userToken)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      console.error('회원 정보를 찾을 수 없습니다.')
    } else {
      const docData = response.data()

      const isBookExits = docData.books.some((book: BookToUserRequest) => book.isbn === isbn)
      if (isBookExits) {
        console.error('이미 동일한 책이 목록에 있습니다.')
      } else {
        const bookColor = await getBookColor(cover)

        const updatedBooks = [
          {
            isbn,
            title,
            color: bookColor,
            depth,
            height,
            author,
            cover,
          },
          ...docData.books,
        ]

        await updateDoc(docRef, { books: updatedBooks })
        onSuccess()
      }
    }
  } catch (error) {
    onError(error)
  }
}

export const editBookToUser = async (
  { isbn, startDate, endDate, bookmarks, isRecommended, wantToReRead }: EditedBookToUserRequest,
  { onSuccess, onError }: FuncType
) => {
  try {
    const userToken = localStorage.getItem('userToken') || ''
    const docRef = doc(db, 'user_saved_books', userToken)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.error('도서 정보를 찾을 수 없습니다.')
    } else {
      const docInfo = docSnap.data()
      const bookInfo = docInfo[isbn]

      const updatedBookInfo = { isbn, startDate, endDate, bookmarks, special: [isRecommended, wantToReRead] }

      await updateDoc(docRef, { [isbn]: updatedBookInfo })
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
    const userToken = localStorage.getItem('userToken') || ''
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

export const deleteBook = async ({ isbn }: DeletedBookRequest, { onSuccess, onError }: FuncType) => {
  try {
    const userToken = localStorage.getItem('userToken') || ''
    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, userToken)
    const response = await getDoc(docRef)

    const userSavedBooksRef = collection(db, 'user_saved_books')
    const userSavedBooksDoc = doc(userSavedBooksRef, userToken)

    if (!response.exists()) {
      console.error('정보를 찾을 수 없습니다.')
    } else {
      const docData = response.data()
      const updatedBooks = docData.books.filter(({ isbn: cur }: { isbn: string }) => cur !== isbn)
      await updateDoc(docRef, { books: updatedBooks })

      await updateDoc(userSavedBooksDoc, {
        [isbn]: deleteField(),
      })

      onSuccess()
    }
  } catch (error) {
    onError(error)
  }
}
