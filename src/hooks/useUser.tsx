import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { UserCredential } from 'firebase/auth'
import { SignInRequest, SignUpRequest } from '@/apis/types/userTypes'
import { signInApi, signUpApi } from '@/apis/user'

const useSignUp = () => {
  const mutationOptions: UseMutationOptions<UserCredential, Error, SignUpRequest> = {
    mutationFn: ({ email, password }: SignUpRequest) => signUpApi({ email, password }),
  }

  return useMutation(mutationOptions)
}

const useSignIn = () => {
  const mutationOptions: UseMutationOptions<UserCredential, Error, SignUpRequest> = {
    mutationFn: ({ email, password }: SignInRequest) => signInApi({ email, password }),
  }

  return useMutation(mutationOptions)
}

export { useSignUp, useSignIn }
