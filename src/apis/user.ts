import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app, db } from '../../firebase.config'
import { UserInfoRequest, SignInRequest, SignUpRequest, FuncType } from './types/userTypes'
import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore'

export const signUpApi = async ({ email, password, nickname }: SignUpRequest, { onSuccess, onError }: FuncType) => {
  try {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, email, password)

    const collectionRef = collection(db, 'user')
    const docRef = doc(collectionRef, email)
    const response = await getDoc(docRef)

    if (!response.exists()) {
      await setDoc(docRef, { nickname, books: [] })
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

export const signOutApi = async () => {
  const auth = getAuth(app)
  return await signOut(auth)
}

export const getUserInfo = async ({ userToken }: UserInfoRequest) => {
  const userQuery = query(collection(db, 'user'))
  const dataSnapShot = await getDocs(userQuery)
  const data = dataSnapShot.docs.filter((doc) => doc.id === userToken)
  return data
}
