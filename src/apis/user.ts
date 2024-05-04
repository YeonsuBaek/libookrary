import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../firebase.config'
import { SignUpRequest } from './types/userTypes'

export const signUpApi = async ({ email, password }: SignUpRequest) => {
  const auth = getAuth(app)
  return await createUserWithEmailAndPassword(auth, email, password)
}
