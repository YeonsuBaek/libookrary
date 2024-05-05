import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app, db } from '../../firebase.config'
import { SignInRequest, SignUpRequest } from './types/userTypes'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

export const signUpApi = async ({ email, password, nickname }: SignUpRequest) => {
  const auth = getAuth(app)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  const collectionRef = collection(db, 'user')
  const docRef = doc(collectionRef, email)
  const response = await getDoc(docRef)

  if (!response.exists()) {
    await setDoc(docRef, { nickname, books: [] })
  }

  return userCredential
}

export const signInApi = async ({ email, password }: SignInRequest) => {
  const auth = getAuth(app)
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutApi = async () => {
  const auth = getAuth(app)
  return await signOut(auth)
}
