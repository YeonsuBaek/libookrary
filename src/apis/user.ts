import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app, db } from '../../firebase.config'
import { SignInRequest, SignUpRequest, FuncType, EditUserInfoRequest } from './types/userTypes'
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

export const signUpApi = async ({ email, password, nickname }: SignUpRequest, { onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)

    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, email)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      await setDoc(docRef, { email, nickname, books: [] })
    } else {
      await updateDoc(docRef, { email, nickname })
    }

    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const signInApi = async ({ email, password }: SignInRequest, { onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    const res = await signInWithEmailAndPassword(auth, email, password)

    onSuccess(res)
  } catch (error) {
    onError(error)
  }
}

export const signOutApi = async ({ onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    await signOut(auth)
    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const getUserInfoApi = async () => {
  try {
    const userToken = localStorage.getItem('userToken')
    const userQuery = query(collection(db, 'user'), where('email', '==', userToken))
    const dataSnapShot = await getDocs(userQuery)

    if (dataSnapShot.empty) {
      console.error('사용자를 찾을 수 없습니다.')
      return null
    }

    const userData = dataSnapShot.docs[0].data()
    return userData
  } catch (error) {
    console.error('회원 정보를 가져오는 데 실패하였습니다.')
  }
}

export const editUserInfoApi = async ({ email, nickname }: EditUserInfoRequest, { onSuccess, onError }: FuncType) => {
  try {
    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, email)
    await updateDoc(docRef, { email, nickname })
    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const unsubscribeApi = async ({ onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      await deleteUser(user)
    }

    onSuccess()
  } catch (error) {
    onError(error)
  }
}
