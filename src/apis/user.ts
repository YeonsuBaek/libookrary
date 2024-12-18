import {
  EmailAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { app, db } from '../../firebase.config'
import { SignInRequest, SignUpRequest, FuncType, EditUserInfoRequest } from './types/userTypes'
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'

export const signUpApi = async (
  { email, password, nickname, language }: SignUpRequest,
  { onSuccess, onError }: FuncType
) => {
  try {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)

    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, email)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      await setDoc(docRef, { email, nickname, language, books: [] })
    } else {
      await updateDoc(docRef, { email, nickname, language })
    }

    await signOut(auth)
    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const signInApi = async ({ email, password }: SignInRequest, { onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    await setPersistence(auth, browserLocalPersistence)

    const res = await signInWithEmailAndPassword(auth, email, password)

    if (typeof window !== 'undefined') {
      localStorage.setItem('userToken', res.user.email || '')
    }

    onSuccess(res)
  } catch (error) {
    onError(error)
  }
}

export const signOutApi = async ({ onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    await signOut(auth)
    typeof window !== 'undefined' && localStorage.removeItem('userToken')
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

export const editUserInfoApi = async (
  { email, nickname, language }: EditUserInfoRequest,
  { onSuccess, onError }: FuncType
) => {
  try {
    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, email)
    await updateDoc(docRef, { email, nickname, language })
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

    typeof window !== 'undefined' && localStorage.removeItem('userToken')
    onSuccess()
  } catch (error) {
    onError(error)
  }
}

export const reauthenticateUserApi = async (password: string, { onSuccess, onError }: FuncType) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('No user is currently logged in.')
  }

  try {
    const credential = EmailAuthProvider.credential(user.email!, password)
    await reauthenticateWithCredential(user, credential)
    onSuccess()
  } catch (error) {
    onError(error)
  }
}
