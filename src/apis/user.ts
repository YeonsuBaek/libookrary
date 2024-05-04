import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../firebase.config'
import { SignInRequest, SignUpRequest } from './types/userTypes'

export const signUpApi = async ({ email, password }: SignUpRequest) => {
  const auth = getAuth(app)
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInApi = async ({ email, password }: SignInRequest) => {
  const auth = getAuth(app)
  return await signInWithEmailAndPassword(auth, email, password)
}
